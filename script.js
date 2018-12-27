let bundle = document.getElementById("listOfFilms");
fetch("movies.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (movieFile) {
        const posterCommonPath = "http://image.tmdb.org/t/p/w300";
        let array = new Array();
        for (let i = 0; i < movieFile.results.length; i++) {
            array[i] = movieFile.results[i].id;
            let listItem = document.createElement("div");
            listItem.setAttribute("class", "movieBlock");
            let url = posterCommonPath + movieFile.results[i].poster_path;
            listItem.innerHTML = '<h3>' + movieFile.results[i].title + '<h3>';
            listItem.innerHTML +=
                '<div><label><input type="checkbox" id="' + movieFile.results[i].id +
                '"><span class="label-text">watch it later</span></label></div>';
            listItem.innerHTML += "Rate: " + movieFile.results[i].vote_average;
            listItem.innerHTML += '<div class="imageBlock"><img src=' + url + '></div>';
            listItem.innerHTML += '<div>' + movieFile.results[i].overview + '</div>';

            bundle.appendChild(listItem);
        }

        function getData() {
            for (let i = 0; i < array.length; i++) {
                let dat = document.getElementById(array[i]);
                if (localStorage.getItem(array[i])) {
                    dat.checked = true;
                } else dat.checked = false;
            }
        }

        function storingFilm() {
            if (typeof Storage != "undefined") {
                getData();
                isClicked();
            }
        }

        function isClicked() {
            for (let i = 0; i < array.length; i++) {
                let idChekBox = document.getElementById(array[i]);
                idChekBox.onclick = (function (j) {
                    return function () {
                        if (this.checked) {
                            setData(array[j]);
                        } else removeData(array[j]);
                    };
                })(i);
            }
        }

        function setData(key) {
            localStorage.setItem(key, "true");
        }

        function removeData(key) {
            localStorage.removeItem(key);
        }
        storingFilm();
    });