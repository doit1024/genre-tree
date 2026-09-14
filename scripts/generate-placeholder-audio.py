#!/usr/bin/env python3
"""Generate short placeholder WAVs so playback works before real stems arrive."""

from __future__ import annotations

import math
import os
import random
import struct
import wave

SR = 22050
NOTES = {
    "C4": 261.63,
    "D4": 293.66,
    "E4": 329.63,
    "F4": 349.23,
    "G4": 392.00,
    "A4": 440.00,
}

# First two phrases of Twinkle Twinkle Little Star.
TWINKLE = [
    ("C4", 1.0),
    ("C4", 1.0),
    ("G4", 1.0),
    ("G4", 1.0),
    ("A4", 1.0),
    ("A4", 1.0),
    ("G4", 2.0),
    ("F4", 1.0),
    ("F4", 1.0),
    ("E4", 1.0),
    ("E4", 1.0),
    ("D4", 1.0),
    ("D4", 1.0),
    ("C4", 2.0),
]


def clamp(value: float) -> float:
    return max(-1.0, min(1.0, value))


def write_wav(path: str, samples: list[float]) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SR)
        frames = b"".join(
            struct.pack("<h", int(clamp(sample) * 32767)) for sample in samples
        )
        wav.writeframes(frames)


def tone(
    freq: float,
    seconds: float,
    *,
    harmonics: tuple[tuple[float, float], ...] = ((1.0, 1.0),),
    volume: float = 0.28,
) -> list[float]:
    n = max(1, int(seconds * SR))
    attack = max(1, int(0.012 * SR))
    release = max(1, int(0.06 * SR))
    out: list[float] = []
    for i in range(n):
        t = i / SR
        sample = 0.0
        for multiple, weight in harmonics:
            sample += weight * math.sin(2 * math.pi * freq * multiple * t)
        env = 1.0
        if i < attack:
            env = i / attack
        elif i > n - release:
            env = max(0.0, (n - i) / release)
        out.append(sample * env * volume)
    return out


def rest(seconds: float) -> list[float]:
    return [0.0] * max(1, int(seconds * SR))


def lowpass(samples: list[float], alpha: float = 0.18) -> list[float]:
    if not samples:
        return samples
    smoothed = [samples[0]]
    for sample in samples[1:]:
        smoothed.append(smoothed[-1] + alpha * (sample - smoothed[-1]))
    return smoothed


def add_noise(samples: list[float], amount: float) -> list[float]:
    rng = random.Random(7)
    return [sample + (rng.random() * 2 - 1) * amount for sample in samples]


def render(beat: float, swing: bool, harmonics: tuple[tuple[float, float], ...]) -> list[float]:
    samples: list[float] = []
    for index, (name, beats) in enumerate(TWINKLE):
        duration = beats * beat
        if swing and beats == 1.0:
            duration *= 1.28 if index % 2 == 0 else 0.72
        samples.extend(tone(NOTES[name], duration, harmonics=harmonics))
        samples.extend(rest(0.02))
    samples.extend(rest(0.2))
    return samples


def main() -> None:
    root = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
    root = os.path.abspath(root)

    write_wav(
        os.path.join(root, "twinkle-root.wav"),
        render(0.32, False, ((1.0, 1.0),)),
    )
    write_wav(
        os.path.join(root, "twinkle-jazz.wav"),
        render(0.3, True, ((1.0, 0.85), (2.0, 0.22), (3.0, 0.08))),
    )
    write_wav(
        os.path.join(root, "twinkle-lofi.wav"),
        add_noise(
            lowpass(render(0.42, False, ((1.0, 0.7), (0.5, 0.18)))),
            0.012,
        ),
    )
    write_wav(
        os.path.join(root, "twinkle-chamber.wav"),
        [
            a + b
            for a, b in zip(
                render(0.36, False, ((1.0, 0.55), (2.0, 0.16))),
                render(0.36, False, ((1.5, 0.18), (3.0, 0.06))),
            )
        ],
    )
    print(f"Wrote placeholder WAVs to {root}")


if __name__ == "__main__":
    main()
