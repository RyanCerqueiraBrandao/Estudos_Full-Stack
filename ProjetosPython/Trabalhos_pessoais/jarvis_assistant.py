"""
====================================================
  JARVIS ASSISTANT - Estilo Homem de Ferro
====================================================
  Gatilhos:
    - 2 palmas rápidas
    - "hello jarvis"
    - "o papai chegou"

  Ao detectar: abre Chrome (monitor 2) + VS Code
  (monitor principal) e fala "seja bem vindo
  senhor Ryan chefão".

  DEPENDÊNCIAS (instalar antes de rodar):
    pip install SpeechRecognition pyaudio pygetwindow screeninfo edge-tts pygame

  No Windows, pode ser necessário também:
    pip install pywin32
====================================================
"""

import pyaudio
import audioop
import time
import threading
import subprocess
import os
import sys
import asyncio
import tempfile
import socket

import speech_recognition as sr
import pygetwindow as gw

# ─── CONFIGURAÇÕES ──────────────────────────────────────────────────────────

# URL que o Chrome abrirá no segundo monitor
CHROME_URL = "https://www.youtube.com/watch?v=BN1WwnEDWAM&list=RDBN1WwnEDWAM&start_radio=1"

# Caminho do Chrome (ajuste se necessário)
CHROME_PATH_WIN  = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
CHROME_PATH_MAC  = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CHROME_PATH_LIN  = "google-chrome"

# Caminho do VS Code (ajuste se necessário)
_username = os.getenv("USERNAME", "")
VSCODE_PATH_WIN  = rf"C:\Users\{_username}\AppData\Local\Programs\Microsoft VS Code\bin\code.cmd"
VSCODE_PATH_MAC  = "/Applications/Visual Studio Code.app/Contents/MacOS/Electron"
VSCODE_PATH_LIN  = "code"

# Frase que o Jarvis vai falar
WELCOME_MSG = "Seja bem vindo senhor. Estou a sua disposição."  # Jarvis britânico clássico
# WELCOME_MSG = "Bem-vindo, senhor!"  # Alternativa em português

# ─── VOZ NEURAL (Edge TTS) ──────────────────────────────────────────────────
#
#  Vozes masculinas neurais disponíveis:
#    Britânicas (estilo Jarvis - Iron Man):
#      "en-GB-ThomasNeural"    ← voz formal, grave, britânica (estável)
#      "en-GB-George"          ← alternativa mais robótica
#    
#    Português BR:
#      "pt-BR-AntonioNeural"  ← grave, clara, natural
#      "pt-BR-FabioNeural"    ← alternativa um pouco mais informal
#
#  Ajuste VOICE_RATE para mais rápido (+10%) ou mais lento (-10%)
#  Ajuste VOICE_PITCH para mais grave (-5Hz) ou mais agudo (+5Hz)

VOICE_NAME  = "pt-BR-AntonioNeural"  # voz britânica estilo Jarvis
VOICE_RATE  = "-10%"    # mais devagar — deliberado e formal
VOICE_PITCH = "-5Hz"   # muito grave — efeito clássico Jarvis

# Sensibilidade do detector de palmas
# Estes valores refletem o comportamento que o detector ja usava na pratica.
CLAP_THRESHOLD        = 500
CLAP_MIN_GAP          = 0.15
CLAP_MAX_GAP          = 0.9
SILENCE_LEVEL         = 100
CLAP_SILENCE_CHUNKS   = 3
CLAP_TRIGGER_COOLDOWN = 1.5

# Palavras-chave de voz (em minúsculo)
VOICE_KEYWORDS = ["hello jarvis", "o papai chegou","ei jarvis"]

# Qual detector usar
ENABLE_CLAP_DETECTOR  = True
ENABLE_VOICE_DETECTOR = False

# ─── UTILITÁRIOS ────────────────────────────────────────────────────────────

def detect_os():
    if sys.platform.startswith("win"):
        return "windows"
    elif sys.platform.startswith("darwin"):
        return "mac"
    return "linux"

OS = detect_os()
_instance_socket = None


def ensure_single_instance() -> bool:
    """Impede duas instancias do JARVIS no mesmo computador."""
    global _instance_socket
    _instance_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        _instance_socket.bind(("127.0.0.1", 48721))
    except OSError:
        print("[ERRO] Ja existe outra instancia do JARVIS em execucao.")
        print("       Feche a instancia anterior e tente novamente.")
        return False
    return True

# ─── FALA COM VOZ NEURAL ────────────────────────────────────────────────────

async def _synthesize(text: str, output_path: str):
    """Sintetiza o áudio com edge-tts e salva em output_path."""
    try:
        import edge_tts
    except ImportError:
        raise RuntimeError(
            "edge-tts não instalado. Execute:  pip install edge-tts"
        )

    communicate = edge_tts.Communicate(
        text,
        voice=VOICE_NAME,
        rate=VOICE_RATE,
        pitch=VOICE_PITCH,
    )
    await communicate.save(output_path)


def _play_audio(path: str):
    """Reproduz o arquivo MP3 via pygame."""
    try:
        import pygame
    except ImportError:
        raise RuntimeError(
            "pygame não instalado. Execute:  pip install pygame"
        )

    pygame.mixer.init()
    pygame.mixer.music.load(path)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        time.sleep(0.05)
    pygame.mixer.music.stop()
    pygame.mixer.quit()


def speak(text: str):
    """
    Fala o texto usando voz neural masculina (Microsoft Edge TTS).
    Funciona offline via síntese local + pygame para reprodução.
    """
    print(f"[JARVIS] {text}")

    # Arquivo temporário para o áudio
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp_path = tmp.name

    try:
        # Sintetiza
        asyncio.run(_synthesize(text, tmp_path))
        # Reproduz
        _play_audio(tmp_path)
    except RuntimeError as e:
        # Fallback: pyttsx3 caso edge-tts ou pygame não estejam instalados
        print(f"[AVISO] {e}")
        print("[AVISO] Usando fallback pyttsx3 (voz menos realista).")
        _speak_fallback(text)
    except Exception as e:
        print(f"[ERRO] Falha na síntese de voz: {e}")
        _speak_fallback(text)
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass


def _speak_fallback(text: str):
    """Fallback com pyttsx3 caso edge-tts/pygame não estejam disponíveis."""
    try:
        import pyttsx3
        engine = pyttsx3.init()
        voices = engine.getProperty("voices")

        selected = None
        for v in voices:
            name = v.name.lower()
            if "microsoft" in name and ("pt" in v.id.lower() or "brazil" in name or "portuguese" in name):
                selected = v.id
                break
        if not selected:
            for v in voices:
                if "microsoft" in v.name.lower():
                    selected = v.id
                    break
        if selected:
            engine.setProperty("voice", selected)

        engine.setProperty("rate", 160)
        engine.setProperty("volume", 1.0)
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        print(f"[ERRO] Fallback pyttsx3 também falhou: {e}")

# ─── MONITORES E JANELAS ────────────────────────────────────────────────────

def get_monitor_info():
    """Retorna lista de monitores como [(x, y, w, h), ...]."""
    try:
        from screeninfo import get_monitors
        return [(m.x, m.y, m.width, m.height) for m in get_monitors()]
    except Exception:
        return [(0, 0, 1920, 1080), (1920, 0, 1920, 1080)]


def move_window_to_monitor(title_keyword: str, monitor_index: int, maximize=True):
    """Move a janela que contenha title_keyword para o monitor especificado."""
    time.sleep(2.5)
    monitors = get_monitor_info()
    if monitor_index >= len(monitors):
        print(f"[AVISO] Monitor {monitor_index} não encontrado. Usando monitor 0.")
        monitor_index = 0

    mx, my, mw, mh = monitors[monitor_index]

    for _ in range(10):
        wins = [w for w in gw.getAllWindows() if title_keyword.lower() in w.title.lower() and w.visible]
        if wins:
            win = wins[0]
            try:
                win.restore()
                time.sleep(0.3)
                win.moveTo(mx + 10, my + 10)
                win.resizeTo(mw - 20, mh - 40)
                if maximize:
                    win.maximize()
            except Exception as e:
                print(f"[AVISO] Não foi possível mover janela: {e}")
            return
        time.sleep(0.5)
    print(f"[AVISO] Janela com '{title_keyword}' não encontrada.")

# ─── AÇÕES PRINCIPAIS ───────────────────────────────────────────────────────

_action_lock = threading.Lock()
_last_action = 0
_is_processing_action = False
ACTION_COOLDOWN = 8


def activate_jarvis(trigger: str):
    """Executa a rotina de boas-vindas."""
    global _last_action, _is_processing_action
    with _action_lock:
        now = time.time()
        if _is_processing_action:
            return
        if now - _last_action < ACTION_COOLDOWN:
            return
        _is_processing_action = True

    try:
        print(f"\n{'='*50}")
        print(f"  GATILHO DETECTADO: {trigger}")
        print(f"{'='*50}\n")

        # Abre Chrome e VS Code ANTES de falar
        print("[JARVIS] Abrindo aplicações...")
        open_chrome()
        open_vscode()
        
        # Aguarda um pouco para as janelas aparecerem
        time.sleep(2)
        
        # Agora fala
        speak(WELCOME_MSG)
    finally:
        with _action_lock:
            _last_action = time.time()
            _is_processing_action = False


def open_chrome():
    """Abre o Chrome com CHROME_URL e move para o segundo monitor."""
    print("[JARVIS] Abrindo Chrome...")
    try:
        if OS == "windows":
            path = os.path.expandvars(CHROME_PATH_WIN)
            if not os.path.exists(path):
                path = path.replace("Program Files", "Program Files (x86)")
            subprocess.Popen([path, "--new-window", CHROME_URL])
        elif OS == "mac":
            subprocess.Popen(["open", "-a", "Google Chrome", CHROME_URL])
        else:
            subprocess.Popen([CHROME_PATH_LIN, "--new-window", CHROME_URL])
    except FileNotFoundError:
        print("[ERRO] Chrome não encontrado. Ajuste CHROME_PATH no script.")
        return

    threading.Thread(target=move_window_to_monitor,
                     args=("Chrome", 1, True), daemon=True).start()


def open_vscode():
    """Abre o VS Code e move para o monitor principal."""
    print("[JARVIS] Abrindo VS Code...")
    try:
        if OS == "windows":
            path = VSCODE_PATH_WIN
            if os.path.exists(path):
                subprocess.Popen([path])
            else:
                try:
                    subprocess.Popen(["code"])
                except FileNotFoundError:
                    print("[ERRO] VS Code não encontrado.")
                    return
        elif OS == "mac":
            subprocess.Popen(["open", "-a", "Visual Studio Code"])
        else:
            subprocess.Popen([VSCODE_PATH_LIN])
    except FileNotFoundError as e:
        print(f"[ERRO] VS Code não encontrado: {e}")
        return

    threading.Thread(target=move_window_to_monitor,
                     args=("Visual Studio Code", 0, True), daemon=True).start()

# ─── DETECTOR DE PALMAS ─────────────────────────────────────────────────────

def clap_detector():
    """Fica escutando o microfone em busca de 2 palmas rápidas."""
    CHUNK     = 1024
    FORMAT    = pyaudio.paInt16
    CHANNELS  = 1
    RATE      = 44100
    _THRESH   = CLAP_THRESHOLD
    _MIN_GAP  = CLAP_MIN_GAP
    _MAX_GAP  = CLAP_MAX_GAP
    _SILENCE  = SILENCE_LEVEL
    _SILENCE_CHUNKS = CLAP_SILENCE_CHUNKS
    _TRIGGER_COOLDOWN = CLAP_TRIGGER_COOLDOWN

    try:
        p = pyaudio.PyAudio()
        stream = p.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, input=True, frames_per_buffer=CHUNK,
                        start=False)
        print(f"[OUVINDO] Detector de palmas ativo (threshold={_THRESH})...", flush=True)
    except Exception as e:
        print(f"[ERRO] Falha ao iniciar detector de palmas: {e}", flush=True)
        return

    clap_times = []
    last_was_clap = False
    silence_chunks = 0
    cooldown_until = 0.0

    try:
        stream.start_stream()
        while True:
            data = stream.read(CHUNK, exception_on_overflow=False)
            rms  = audioop.rms(data, 2)
            now = time.time()

            if now < cooldown_until:
                if rms < _SILENCE:
                    silence_chunks += 1
                    if silence_chunks >= _SILENCE_CHUNKS:
                        last_was_clap = False
                else:
                    silence_chunks = 0
                continue

            # Detecta transição de silêncio para som alto (INÍCIO de palma)
            if rms > _THRESH and not last_was_clap:
                last_was_clap = True
                silence_chunks = 0

                # Limpa palmas antigas
                clap_times = [t for t in clap_times if now - t <= _MAX_GAP]

                # Ignora oscilações muito próximas que pertencem à mesma palma.
                if clap_times and now - clap_times[-1] < _MIN_GAP:
                    continue

                clap_times.append(now)

                # Verifica se temos 2 palmas no intervalo correto
                if len(clap_times) >= 2:
                    gap = clap_times[-1] - clap_times[-2]
                    if _MIN_GAP <= gap <= _MAX_GAP:
                        cooldown_until = now + _TRIGGER_COOLDOWN
                        clap_times.clear()
                        threading.Thread(
                            target=activate_jarvis,
                            args=("2 palmas",),
                            daemon=True
                        ).start()

            # Detecta transição de som alto para silêncio (FIM de palma)
            elif rms < _SILENCE:
                silence_chunks += 1
                if silence_chunks >= _SILENCE_CHUNKS:
                    last_was_clap = False
                    if clap_times and now - clap_times[-1] > _MAX_GAP:
                        clap_times.clear()
            else:
                silence_chunks = 0
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print(f"[ERRO] Detector de palmas: {type(e).__name__}: {e}", flush=True)
    finally:
        try:
            stream.stop_stream()
            stream.close()
            p.terminate()
        except Exception:
            pass

# ─── DETECTOR DE VOZ ────────────────────────────────────────────────────────

def voice_detector():
    """Fica escutando o microfone em busca das frases-gatilho."""
    try:
        recognizer = sr.Recognizer()
        recognizer.energy_threshold = 300
        recognizer.pause_threshold  = 0.8

        print("[OUVINDO] Detector de voz ativo...", flush=True)
        print(f"          Palavras-chave: {VOICE_KEYWORDS}", flush=True)

        mic = sr.Microphone()
        with mic as source:
            recognizer.adjust_for_ambient_noise(source, duration=1)
    except Exception as e:
        print(f"[ERRO] Falha ao iniciar detector de voz: {e}", flush=True)
        return

    while True:
        try:
            with mic as source:
                audio = recognizer.listen(source, phrase_time_limit=5)

            for lang in ["pt-BR", "en-US"]:
                try:
                    text = recognizer.recognize_google(audio, language=lang).lower()
                    print(f"[VOZ] Ouvi ({lang}): {text}", flush=True)

                    for kw in VOICE_KEYWORDS:
                        if kw in text:
                            threading.Thread(
                                target=activate_jarvis,
                                args=(f'voz: "{kw}"',),
                                daemon=True
                            ).start()
                            break
                    break
                except sr.UnknownValueError:
                    continue
                except sr.RequestError as e:
                    print(f"[ERRO] Google Speech API: {e}", flush=True)
                    break

        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"[ERRO] Detector de voz: {type(e).__name__}: {e}", flush=True)
            time.sleep(1)

# ─── MAIN ────────────────────────────────────────────────────────────────────

def main():
    if not ensure_single_instance():
        return

    print("=" * 50)
    print("       JARVIS - Assistente do Sr. Ryan")
    print("=" * 50)
    print(f"  OS detectado  : {OS.upper()}")
    print(f"  Voz           : {VOICE_NAME}  (neural masculina)")
    print(f"  Velocidade    : {VOICE_RATE}   |  Tom: {VOICE_PITCH}")
    print(f"  Chrome URL    : {CHROME_URL}")
    print()
    print("  Gatilhos:")
    print("    🖐  Duas palmas rápidas")
    print("    🎤  'Hello Jarvis'")
    print("    🎤  'O papai chegou'")
    print()
    print("  Pressione Ctrl+C para sair.")
    print("=" * 50)
    print()

    threads = []

    if ENABLE_CLAP_DETECTOR:
        t_clap = threading.Thread(target=clap_detector, daemon=True)
        t_clap.start()
        threads.append(t_clap)
        print("  ✓ Detector de palmas ativo")
    else:
        print("  ✗ Detector de palmas DESATIVADO")

    if ENABLE_VOICE_DETECTOR:
        t_voice = threading.Thread(target=voice_detector, daemon=True)
        t_voice.start()
        threads.append(t_voice)
        print("  ✓ Detector de voz ativo")
    else:
        print("  ✗ Detector de voz DESATIVADO")

    if not threads:
        print("\n[ERRO] Nenhum detector ativado! Ative ENABLE_CLAP_DETECTOR ou ENABLE_VOICE_DETECTOR.")
        return

    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\n[JARVIS] Encerrando. Até logo, Sr. Ryan!")
    except Exception as e:
        print(f"\n[ERRO FATAL] {e}")
        import traceback
        traceback.print_exc()
        input("Pressione Enter para encerrar...")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"[ERRO] Falha ao iniciar JARVIS: {e}")
        import traceback
        traceback.print_exc()
        input("Pressione Enter para encerrar...")
