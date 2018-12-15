let likes = [];

window.onload = async function() {
  const movies = (await (await fetch("/movies")).json()).results;
  const fields = ["id", "title", "vote_average", "poster_path", "overview"];
  const container = document.createElement("div");
  const IMG_URL = "http://image.tmdb.org/t/p/w300";
  let content = "";
  likes = getBookmarks();

  movies.forEach(movie => {
    let id;
    let title;
    let vote_average;
    let buttonName = "";
    content += `<div class="movie">`;
    fields.forEach(field => {
      switch (field) {
        case "id": {
          id = movie[field];
          break;
        }
        case "title": {
          title = movie[field];
          if (findBookmark(id.toString()))
            buttonName = "clicked";
          content += `<div class=movie__head>
            <h2>${title}</h2>
            <div class="likeButton">
						  <i class="fa fa-heart ${buttonName}" data-id="${id}"></i>
				  	</div>
					</div>`;
          break;
        }
        case "vote_average": {
          vote_average = movie[field];
          break;
        }
        case "poster_path": {
          content += `<img src="${IMG_URL + movie[field]}" />`;
          break;
        }
        case "overview": {
          content += `<div class="movie__overview">
            <h3>${title}</h3>
            <span>Average raiting: ${vote_average}</span>
            <p>${movie[field]}</p>
          </div>`;
          break;
        }
      }
    });
    content += `</div>`;
  });

  container.className = "container";
  container.innerHTML = content;
  document.body.appendChild(container);

  let likeButtons = document.querySelectorAll(".likeButton ");
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", like);
  }
};

function like(e) {
  const elem = e.target;
  const id = elem.dataset.id;

  if (findBookmark(id)) {
    console.log(typeof id);
    removeFromBookmarks(id);
    elem.className = elem.className.replace(" clicked", "");
  } else {
    console.log(id);
    addToBookmarks(id);
    elem.className += " clicked";
  }
}

function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function addToBookmarks(id) {
  localStorage.setItem(
    "bookmarks",
    JSON.stringify([id, ...likes])
  );
  likes.push(id);
}

function removeFromBookmarks(id) {
  console.log("remove");
  likes = likes.filter(bookmark => bookmark !== id);
  localStorage.setItem(
    "bookmarks",
    JSON.stringify([...likes])
  );
}

function findBookmark(id) {
  return !!likes.filter(el => el === id).length;
}
