## 🚀 NyaZygisk Changelog

### **新功能 (Features)**
* **系統屬性偽裝 (Property Spoofing)**：支援從 `/data/adb/modules/zygisksu/spoof.prop` 載入自定義屬性，並自動隨機化 `ro.boot.vbmeta.digest` 以提升隱蔽性。
* **增強 Zygote 痕跡清理**：將 Zygote 卸載檢查機制增加至最多 5 輪循環，解決因執行時機（Timing issue）導致多模組環境下清理不全的問題。

### **效能優化 (Performance)**
* **共享記憶體快取 (Shared Memory Cache)**：引入 memfd 支援的共享記憶體快取機制，加速 `ProcessFlags` 查找並避免重複 IPC 通訊，提升進程標誌獲取效能。
* **零配置/零分配解析 (Zero-allocation)**：
    * 於 `injector` 中引入 `getdents64` 系統調用取代 `readdir`，減少堆記憶體分配。
    * 使用 `std::string_view` 與自定義 `fast_atoi` 解析器重構 `mount_info` 處理流程，大幅降低 CPU 開銷。
* **Hook 邏輯優化**：在 `strdup` Hook 中加入首字快速匹配檢查，優化熱點路徑效能。

### **修復與改進 (Fixes & Refactors)**
* **專案更名**：將專案名稱從 `NeoZygisk` 更新為 `NyaZygisk`，更新 CI 配置、Issue 模板及相關文件中的品牌名稱。
* **執行緒安全強化**：使用 `std::atomic` 與 `compare_exchange_strong` 重構 Zygote Hook 邏輯，修復潛在的競態條件（Race conditions）。
* **穩定性修復**：
    * 修復 `property_get` 在卸載 PLT 備份時缺少正確中斷條件的邏輯錯誤。
    * 修復 `/dev/urandom` 檔案描述符（FD）洩漏問題。
* **環境相容性**：
    * `maxKsuVersion` 提升至 **50000**。
    * CI 流程切換至 Zulu JDK 21 並更新 Android Build Tools 至 36.1.0。

---

**比較基準：** `de38c62` (JingMatrix) -> `4f6cfcf96` (HSSkyBoy)