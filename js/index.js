// State management
let pin = "";
const pinLength = 6;
let currentBalance = 2450000;
let currentCashback = 0;

// Show transfer screen
function showTransfer() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("transferSection").classList.add("active");
  document.querySelector(".quick-actions").style.display = "none";
  document.querySelector(".section-header").style.display = "none";
}

// Show dashboard
function showDashboard() {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("transferSection").classList.remove("active");
  document.querySelector(".quick-actions").style.display = "grid";
  document.querySelector(".section-header").style.display = "flex";
  // Reset transfer form
  document.getElementById("accountNumber").value = "";
  document.getElementById("accountName").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("cashbackPreview").style.display = "none";
}

// Show withdraw (placeholder)
function showWithdraw() {
  alert("Withdrawal feature coming in next update!");
}

// Switch tab
function switchTab(element, tab) {
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  if (tab === "home") {
    showDashboard();
  } else if (tab === "transfer") {
    showTransfer();
  } else {
    alert(tab.charAt(0).toUpperCase() + tab.slice(1) + " feature coming soon!");
  }
}

// Validate account number (mock)
function validateAccount(input) {
  const value = input.value.replace(/\D/g, "");
  input.value = value;

  if (value.length === 10) {
    // Mock account name lookup
    setTimeout(() => {
      document.getElementById("accountName").value = "John Doe (MTN MOMO)";
      document.getElementById("accountName").style.color = "#1a1a2e";
      document.getElementById("accountName").style.fontWeight = "600";
    }, 500);
  } else {
    document.getElementById("accountName").value = "";
    document.getElementById("accountName").style.color = "#666";
    document.getElementById("accountName").style.fontWeight = "400";
  }
}

// Calculate cashback
function calculateCashback(input) {
  const amount = parseFloat(input.value) || 0;
  const cashback = Math.min(Math.floor(amount * 0.02), 5000);
  currentCashback = cashback;

  if (amount >= 1000) {
    document.getElementById("cashbackPreview").style.display = "flex";
    document.getElementById("cashbackAmount").textContent =
      "UGX" + cashback.toLocaleString();
  } else {
    document.getElementById("cashbackPreview").style.display = "none";
  }
}

// Claim task
function claimTask(btn, amount) {
  btn.innerHTML = '<span class="loading"></span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "✓ Claimed!";
    btn.style.background = "#4caf50";

    // Animate balance increase
    const balanceEl = document.querySelector(".balance-amount");
    const startBalance = currentBalance;
    const targetBalance = currentBalance + amount;
    const duration = 1000;
    const startTime = performance.now();

    function updateBalance(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newBalance = Math.floor(
        startBalance + (targetBalance - startBalance) * easeProgress,
      );

      balanceEl.textContent = "UGX" + newBalance.toLocaleString() + ".00";

      if (progress < 1) {
        requestAnimationFrame(updateBalance);
      } else {
        currentBalance = targetBalance;
      }
    }

    requestAnimationFrame(updateBalance);

    // Reset button after 6 seconds
    setTimeout(() => {
      btn.textContent = "Claim Now";
      btn.style.background = "";
      btn.disabled = false;
    }, 6000);
  }, 800);
}

// Show PIN modal
function showPinModal() {
  const amount = document.getElementById("amount").value;
  if (!amount || amount < 1000) {
    alert("Please enter a valid amount (minimum UGX1,000)");
    return;
  }
  if (!document.getElementById("accountNumber").value) {
    alert("Please enter recipient account number");
    return;
  }

  document.getElementById("pinAmount").textContent =
    "UGX" + parseInt(amount).toLocaleString();
  document.getElementById("pinModal").classList.add("active");
  pin = "";
  updatePinDisplay();
}

// Enter PIN digit
function enterPin(num) {
  if (pin.length < pinLength) {
    pin += num;
    updatePinDisplay();

    if (pin.length === pinLength) {
      setTimeout(submitPin, 300);
    }
  }
}

// Clear PIN
function clearPin() {
  pin = "";
  updatePinDisplay();
}

// Update PIN display
function updatePinDisplay() {
  for (let i = 1; i <= pinLength; i++) {
    const dot = document.getElementById("dot" + i);
    if (i <= pin.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  }
}

// Submit PIN
function submitPin() {
  if (pin.length === pinLength) {
    document.getElementById("pinModal").classList.remove("active");
    document.getElementById("successCashback").textContent =
      "+UGX" + currentCashback.toLocaleString();
    document.getElementById("successScreen").classList.add("active");
    pin = "";
    updatePinDisplay();
  }
}

// Close success screen
function closeSuccess() {
  document.getElementById("successScreen").classList.remove("active");
  showDashboard();
}

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                z-index: 3000;
                animation: fadeIn 0.3s ease-out;
            `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Countdown timer
let countdownSeconds = 6;
setInterval(() => {
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    countdownSeconds = countdownSeconds > 1 ? countdownSeconds - 1 : 6;
    countdownEl.textContent = "Next: " + countdownSeconds + "s";
  }
}, 1000);

// Close modal on outside click
document.getElementById("pinModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.remove("active");
    pin = "";
    updatePinDisplay();
  }
});
