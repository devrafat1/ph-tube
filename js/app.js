// main function where api is fetching 

const loadVideos = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    if (!response.ok) {
      throw new Error("Network problem");
    }
    const data = await response.json();
    const videos = data.data;
    displayVideos(videos);
  } catch (err) {
    console.error("Error loading videos:", err);
  }
};

// display all api datas here

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerText = "";

  videos.forEach((video) => {

    // this is for dynamic buttons
    const sec = document.getElementById ('dynamic-btn')
    sec.innerHTML = `
    <div class="all-btn" id="all-view">
    <button class="bg-[#25252526] text-black text-sm font-medium px-5 py-2 rounded hover:bg-[#FF1F3D] hover:text-white" onclick="allBtn()">All</button>
</div>
<div class="music-btn" id="music-view">
    <button class="bg-[#25252526] text-black text-sm font-medium px-5 py-2 rounded hover:bg-[#FF1F3D] hover:text-white" onclick="musicBtn()">Music</button>
</div>
<div class="comedy-btn" id="comedy-view">
    <button class="bg-[#25252526] text-black text-sm font-medium px-5 py-2 rounded hover:bg-[#FF1F3D] hover:text-white" onclick="comedyBtn()">Comedy</button>
</div>
<div class="drawing-btn" id="drawing-view">
    <button class="bg-[#25252526] text-black text-sm font-medium px-5 py-2 rounded hover:bg-[#FF1F3D] hover:text-white" onclick="drawingBtn()">Drawing</button>
</div>
    `

//    this is for dynamic times
        const postedDateInSeconds = video?.others?.posted_date || 0; 

        function formatTime(timeInSeconds) {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
  
        if (hours > 0) {
             return `${hours} hours ${minutes} minutes ago`;
        } else {
             return '';
         }
    }

    const formattedTime = formatTime(postedDateInSeconds);

    // This is for dynamic cards
    const div = document.createElement("div");
    div.classList = `card bg-base-100 rounded-box`;
    div.innerHTML = `
  <figure style="position: relative;">
    <img id="thumbnail" class="w-[420px] h-48 object-cover rounded-lg" src='${video?.thumbnail}'/>
    <div class="absolute bottom-2 right-2 bg-opacity-70 bg-black text-white p-1 rounded-md"> ${formattedTime}</div>
  </figure>
  <div class="card-footer flex justify-left gap-4 mt-8 py-3">
    <div>
      <div class="avatar online">
        <div class="w-10 rounded-full">
          <img class="rounded-full w-10 h-10" src=${video?.authors?.[0].profile_picture}/>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="font-bold text-base">${video?.title}</h2>
      <div>
        <p id="user-name" class="inline text-base">${video?.authors?.[0].profile_name}</p>
        <img id="blue-badge" class='inline-block' src="${video?.authors?.[0].verified ? "./images/fi_10629607.svg" : ""}" />
        <p id="views">${video?.others?.views}</p>
      </div>
    </div>
  </div>
`;
    videoContainer.appendChild(div);
  });
};
// buttons called
loadVideos(1000);

const allBtn = () => {
  loadVideos(1000);
};
const musicBtn = () => {
  loadVideos(1001);
};
const comedyBtn = () => {
  loadVideos(1003);
};

const drawingBtn = async () => {
  const res = await loadVideos(1005);
  const videoContainer = document.getElementById("video-container");
// condition check for no data
  if (res === null || typeof res === "undefined") {
    videoContainer.innerHTML = `
        <div class="grid grid-cols-1 col-span-4 justify-center items-center">
                <figure class="">
                    <img id="img-no-data" class="mx-auto" src="./images/Icon.png" alt="" />
                    <figcaption>
                        <h1 class="text-2xl text-center font-bold mt-4">Oops!! Sorry, There is no content here</h1>
                    </figcaption>
                </figure>
        </div>
        `;
  } else {
    videoContainer.innerHTML = "";

    res.data.forEach((video) => {
      const div = document.createElement("div");
      div.classList = "card bg-base-100 rounded-box";
      div.innerHTML = `
                <figure><img id="thumbnail" class="w-4/5 lg:w-[312px] h-48 rounded-lg" src='${video?.thumbnail}'/></figure>
                <div class="card-body">
                    <div class="flex flex-row justify-center items-center gap-2">
                        <figure><img class="rounded-full w-10 h-10" src=${video?.authors?.[0].profile_picture}/></figure>
                        <h2 class="font-bold text-base">${video?.title}</h2>
                    </div>
                    <div class="grid grid-cols-2">
                        <p id="user-name" class="text-base">${video?.authors?.[0].profile_name}</p>
                        <img id="blue-badge" src="${video?.authors?.[0].verified? "./images/fi_10629607.svg": ""}" />
                    </div>
                    <p id="views">${video?.others?.views}</p>
                </div>
            `;
      videoContainer.appendChild(div);
    });
  }
};

// sortings by descending order
const sortBtn = () => {
  const videoContainer = document.getElementById("video-container");
  const videos = videoContainer.children;
  const videosArr = [...videos];

  videosArr.sort((a, b) => {
    const aViews = parseInt(a.querySelector("#views").innerText.replace("K", "").replace("M", "").replace("B", ""));
    const bViews = parseInt(b.querySelector("#views").innerText.replace("K", "").replace("M", "").replace("B", ""));
    return bViews - aViews;
  });

  videoContainer.innerHTML = "";
  videosArr.forEach((video) => videoContainer.appendChild(video));
};
