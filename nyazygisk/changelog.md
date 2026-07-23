## NyaZygisk v2.3-313

Release date: 2026-07-23

This release is compared against upstream `JingMatrix/NeoZygisk v2.3` and summarizes the additions and improvements included in the fork build `NyaZygisk-v2.3-313-2dd5483-release.zip`.

### Main updates compared with upstream JM v2.3

#### Hiding and spoofing

* Added `spoof.prop` property spoofing, loading custom properties from `/data/adb/modules/zygisksu/spoof.prop`.
* Randomized `ro.boot.vbmeta.digest` to reduce direct environment fingerprint matching.
* Strengthened Zygote trace cleanup with repeated cleanup passes and additional edge-case handling.
* Improved font and resource overlay unmount handling to avoid failures caused by direct unmounts.

#### Compatibility and stability

* Added OneUI 8.5 `forkAndSpecialize` support.
* Added Android 7.1 compatibility fixes.
* Added support for BTI (Branch Target Identification) enabled devices.
* Skip module loading when the daemon is unreachable, reducing false detection and instability in isolated processes.
* Fixed `TMP_PATH` leaking into app processes.
* Fixed stability issues related to anonymous memory remapping and shared-cache ordering.

#### Performance and low-level improvements

* Added a memfd shared-memory cache for `ProcessFlags` to reduce repeated IPC overhead.
* Refactored parts of the injector using `getdents64`, `std::string_view`, and a custom fast parser to reduce configuration and CPU overhead.
* Optimized file-descriptor operations, PLT hook hot paths, and property loading.
* Improved thread safety and internal consistency in Zygote hooks.

#### User experience and module features

* Added a WebUI for displaying module operation status.
* Added root implementation detection to the status display.
* Added an anonymous-memory toggle.
* Added a banner image URL for KSUN module display.

#### Project and build maintenance

* Renamed the project from `NeoZygisk` to `NyaZygisk`.
* Updated `updateJson` to point to the new site path.
* Migrated the build to Gradle 9 and replaced the old `rust-android` flow with `cargo-ndk`.
* Updated CI and Telegram release workflows and their message formatting.

### Incremental changes from asset 302 to asset 313

* Added the KSUN banner image URL.
* Refactored the font workaround into an fd-aware Zygote detach flow.
* Hardened anonymous-memory remapping and shared-cache ordering.
* Prevented `TMP_PATH` from leaking into app processes again.
* Added BTI device support.
* Abort direct Zygote unmount when resource overlays are present, avoiding failures in that scenario.

---

Comparison range: `ea4aa9df` (`JingMatrix/NeoZygisk v2.3`) -> `2dd5483b` (`HSSkyBoy/NyaZygisk v2.3-313`)
