const main = document.querySelector(".profile-info");
const body = document.querySelector("body");
const username = document.querySelector("#username");
const analyticsScriptTag = document.querySelector("#analytics-js");
const manageusersBtn = document.querySelector("#manage-users");
const editProfileBtn = document.querySelector("#edit-profile");
const createAdminBtn = document.querySelector("#my-art");
const statsBtn = document.querySelector("#stats");
const logoutBtn = document.querySelector("#logout-btn");
const settingsBtn = document.querySelector("#settings");

// Components
const profileScript = `
const name = document.querySelector("");

`;
const createAdminComponent = ` <h2 id="admin-header">Create Admin</h2>

        <div class="profile-data">
          <form method="post" class="sign-form">
            <div class="form-control admin-input">
              <label>Username: </label>
              <input type="text" id="name-input" placeholder="Admin Audu" />
            </div>
            <div class="form-control admin-input">
              <label>Email: </label>
              <input
                type="text"
                id="email-input"
                autocomplete="email"
                placeholder="admin@gmail.com"
                required
              />
            </div>
            <div class="form-control admin-input" id="signup-psw">
              <label for="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password-input"
                autocomplete="new-password"
                placeholder="********"
                required
              />
            </div>
            <div class="submit-btn">
              <a onclick="handleDataUpdate()"> Save </a>
            </div>
          </form>`;
const AnalyticsComponent = `<section class="analytics-component">
          <div class="profile-data">
          <h2 id="analytics-header">User Analytics</h2>
          <div class="analytics-section">
          <div class="user-cards">
              <div class="card">
                <div class="title">
                  <p class="title-text">
                      Total Monthly Visitors
                  </p>
              </div>
              <div class="data">
                  <p>39,500</p>
                  <div class="range">
                      <div class="fill">
                      </div>
                  </div>
              </div>
              </div>
            
              <div class="card">
              <div class="title">
                  <p class="title-text">
                      Total Users
                  </p>
              </div>
              <div class="data">
                  <p>84,903</p>
                  <div class="range">
                      <div class="fill">
                      </div>
                  </div>
              </div>
              </div>
            
              <div class="card">
              <div class="title">
                  <p class="title-text">
                      Current Active Users
                  </p>
              </div>
              <div class="data">
                  <p>
                      3,080
                  </p>
                  <div class="range">
                      <div class="fill">
                      </div>
                  </div>
              </div>
            </div>
          </div>

            <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
        </div>
        </section>`;
const analyticsScript = `
const xValues = [
    "28th",
    "29th",
    "30th",
    "31st",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ];
  const yValues = [
    200, 325, 320, 413, 265, 604, 587, 549, 674, 680, 660, 709, 713, 785,
  ];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "#302c1b",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Daily Active Users (Last 14 days)",
      },
      scales: {
        yAxes: [{ ticks: { min: 6, max: 1000 } }],
      },
    },
  });
`;
const ManageUsersComponent = ` <h2>Manage Users</h2>
        <div class="profile-data">
          <form method="post" class="sign-form">
            <div class="form-control">
              <label>Deactivate Account: </label>
              <input type="email"
                id="email-input"
                autocomplete="email"
                placeholder="user@gmail.com"
                required /><div class="activitation-btn deactivate-btn">
              <a onclick="handleDataUpdate()"> Deactivate </a>
            </div>
            </div>
            <div class="form-control">
              <label>Reactivate Account: </label>
              <input
                type="email"
                id="email-input"
                autocomplete="email"
                placeholder="user@gmail.com"
                required
              /><div class="activitation-btn activate-btn">
              <a onclick="handleDataUpdate()"> Activate </a>
            </div>
            </div>
          </form>
            `;
const SettingComponent = `<section>
          <h2>Settings</h2>
          <div class="profile-data">
            <h1 class="settings-header">
              Sorry this page is currently under construction check in a little
              later
            </h1>
          </div>
        </section>`;
const deleteAccountComponent = `<h2>Delete My Account</h2>
        <div class="delete-container">
          <p>Are you sure you want to leave</p>
          <div class="delete-btns">
            <button>TAKE ME BACK</button><button>I WANT TO LEAVE</button>
          </div>
        </div>`;

// Event listeners
editProfileBtn.addEventListener("click", () => {
  window.open("../pages/adminDashboard.html", "_self");
});
createAdminBtn.addEventListener("click", () => {
  updateView(createAdminComponent, "createAdmin");
});
statsBtn.addEventListener("click", () => {
  updateView(AnalyticsComponent, "analytics");
  analyticsScriptTag.innerHTML = analyticsScript;
});
manageusersBtn.addEventListener("click", () => {
  updateView(ManageUsersComponent, "manageusers");
});
settingsBtn.addEventListener("click", () => {
  updateView(SettingComponent, "setting");
});
logoutBtn.addEventListener("click", () => {
  logout();
});
window.addEventListener("load", () => {
  // Get username from local storage
  const storedname = localStorage.getItem("username") ?? "User";
  username.innerText = `Hi, ${storedname}`;
  // Prevent Section from changing on page refresh
  switch (window.location.hash) {
    case "#editProfile":
      window.open("../pages/adminDashboard.html", "_self");
      break;

    case "#createAdmin":
      updateView(createAdminComponent);
      break;

    case "#manageusers":
      updateView(ManageUsersComponent);
      break;

    case "#analytics":
      updateView(AnalyticsComponent);
      analyticsScriptTag.innerHTML = analyticsScript;
      break;

    case "#setting":
      updateView(SettingComponent);
      break;

    default:
      break;
  }
});
// deleteAccountBtn.addEventListener("click", () =>
//   updateView(deleteAccountComponent)
// );
// Function Declararions
function updateView(component, hash) {
  if (hash) {
    window.location.hash = hash;
  }
  main.innerHTML = "";
  main.innerHTML = component;
}
function logout() {
  localStorage.clear();
  window.open("../index.html", "_self");
}
async function createAdmin(data) {
  const url = "http://localhost:3000/auth/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`HTTP Error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
function addNotification(message, success) {
  //create notification
  const NotiElement = document.createElement("div");
  NotiElement.id = "stickyNotification";
  NotiElement.style.display = "flex";
  NotiElement.style.alignItems = "center";
  NotiElement.style.position = "absolute";
  NotiElement.style.width = "max-content";
  NotiElement.style.height = "max-content";
  NotiElement.style.padding = "10px";
  NotiElement.style.borderRadius = "5px";
  NotiElement.style.border = "1px solid black";
  NotiElement.style.backgroundColor = success ? "green" : "red";
  NotiElement.style.left = "50%";
  NotiElement.style.top = "0";
  NotiElement.style.transform = "translate(-50%, 50%)";

  NotiElement.innerHTML = ` <span>${message}.</span><div id='closeBtn'>X</div>`;
  document.body.appendChild(NotiElement);
  //keep it always at the bottom corner of the window
  document.addEventListener("scroll", (event) => {
    let btmPos = -window.scrollY + 10;
    NotiElement.style.bottom = btmPos + "px";
  });
  // Remove popup
  // By timer
  setTimeout(() => document.body.removeChild(NotiElement), 3000);
  // By button click
  document.getElementById("closeBtn").addEventListener("click", () => {
    document.body.removeChild(NotiElement);
  });
}
