## NyaZygisk v2.4-316

Release date: 2026-08-10

This release is based on [JingMatrix/NeoZygisk commit `4f681671`](https://github.com/JingMatrix/NeoZygisk/commit/4f681671b13b87643b3debd3b28c1787eb146a6d). The items below describe the additional changes in NyaZygisk relative to that upstream baseline.

### Android compatibility

* Adds OneUI 8.5 `forkAndSpecialize` support, Android 7.1 compatibility fixes, and support for BTI-enabled ARMv9 devices.

### Hiding and process handling

* Adds `spoof.prop` system-property spoofing, including randomized `ro.boot.vbmeta.digest` values.
* Prevents the internal `TMP_PATH` environment variable from leaking into injected app processes.
* Cleans Zygote traces more thoroughly and improves `atexit` array validation and recompaction.
* Uses a memfd-backed shared-memory cache for process flags, reducing repeated daemon IPC.
* Skips module loading for isolated processes when the daemon cannot be reached.

### Stability and performance

* Reworks Zygote/font-overlay handling to track inherited file descriptors and fall back safely when font or `/product` resource overlays are present.
* Improves anonymous-memory remapping and shared-cache ordering.
* Optimizes property parsing, mount-info parsing, file-descriptor operations, and PLT hook hot paths.

### Module features

* Adds a WebUI with module status, root implementation detection, and an anonymous-memory toggle.
* Adds a banner image URL for KSUN module display.
* Renames the module from NeoZygisk to NyaZygisk and moves update metadata to the NyaZygisk site path.

---

Comparison range: [`4f681671`](https://github.com/JingMatrix/NeoZygisk/commit/4f681671b13b87643b3debd3b28c1787eb146a6d) (upstream NeoZygisk) -> NyaZygisk v2.4-316.
