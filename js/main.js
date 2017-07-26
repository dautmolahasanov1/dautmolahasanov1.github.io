(function() {
    "use strict"

    var catList = document.querySelector(".cat_clicker .cat_list"),
        catArea = document.querySelector(".cat_clicker .cat_area"),
        catImage = document.querySelector(".cat_clicker .cat_image"),
        catName = document.querySelector(".cat_clicker .name"),
        catCount = document.querySelector(".cat_clicker .count"),
        catLevel = document.querySelector(".cat_clicker .level"),
        adminForm = document.querySelector(".cat_clicker .admin_form"),
        adminButton = document.querySelector(".cat_clicker .admin_button"),
        submitButton = document.querySelector(".cat_clicker .submit"),
        cancelButton = document.querySelector(".cat_clicker .cancel"),
        catNameIn = document.querySelector(".cat_clicker .cat_name"),
        catImageIn = document.querySelector(".cat_clicker .cat_imageUrl"),
        catCountIn = document.querySelector(".cat_clicker .cat_clicks"),
        error = document.querySelector(".cat_clicker .error");

    var model = {
        currentCat: null,
        cats: [{
            name: "Goldie",
            count: 0,
            image: "img/cat1.jpg"
        }, {
            name: "Enigma",
            count: 0,
            image: "img/cat2.jpg"
        }, {
            name: "Fantasy",
            count: 0,
            image: "img/cat3.jpg"
        }, {
            name: "Kitkat",
            count: 0,
            image: "img/cat4.jpg"
        }, {
            name: "Panda",
            count: 0,
            image: "img/cat5.jpg"
        }, {
            name: "Snuggles",
            count: 0,
            image: "img/cat7.jpg"
        }],
    };

    var controller = {

        init: function() {
            model.currentCat = model.cats[0];
            catListView();
            catView();
            adminView();
            this.setClass();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getCats: function() {
            return model.cats;
        },
        increment: function() {
            model.currentCat.count++;
            catView();
        },
        setCat: function(index) {
            model.currentCat = model.cats[index];
        },
        addCat: function() {
            model.cats.push({
                name: catNameIn.value,
                image: catImageIn.value,
                count: catCountIn.value
            });
            catListView();
            adminForm.reset();
            adminForm.classList.add("hiden");
        },
        setClass: function(index) {
            for(var i = 0; i < catList.children.length; i++) {
                if(index === i) {
                    catList.children[i].children[0].classList.add("active");
                } else if (index === undefined) {
                    catList.children[0].children[0].classList.add("active")
                } else {
                    catList.children[i].children[0].classList.remove("active");
                }
            }
        },
        showError: function() {
            error.classList.remove("hide");
            setTimeout(function() {
            error.classList.add("hide");
        }, 3000)},
        level: function(count) {
            if(count < 10) {
                return "Infant";
            } else if (count < 20) {
                return "Toddler";
            } else if (count < 30) {
                return "Kid";
            } else if (count < 40) {
                return "Teen";
            } else if (count < 50) {
                return "Adult";
            } else {
                return "Ninja";
            }
        }
    };

    function catListView() {
        var cats = controller.getCats(),
            currentCat = controller.getCurrentCat();

        catList.innerHTML = "";
        for (var i = 0; i < cats.length; i++) {
            catList.insertAdjacentHTML("beforeend", `
                <li><button class="btn margin-b-16">` + cats[i].name +`</button></li>
            `);

            (function(index) {
                catList.children[index].addEventListener("click", function() {
                    controller.setCat(index);
                    controller.setClass(index);
                    catView();
                });
            })(i);
        }
    };

    function catView() {
        var currentCat = controller.getCurrentCat();

        catImage.setAttribute("src", currentCat.image);
        catName.innerHTML = currentCat.name;
        catCount.innerHTML = currentCat.count;
        catLevel.innerHTML = controller.level(currentCat.count);

    };

    function adminView() {
        adminButton.addEventListener("click", function() {
            adminForm.classList.toggle("hiden");
        });

        cancelButton.addEventListener("click", function(e) {
            e.preventDefault();
            adminForm.classList.toggle("hiden");
            adminForm.reset();
        });

        submitButton.addEventListener("click", function(e) {
            e.preventDefault();
            if(catNameIn.value.length >= 3 && catImageIn.value.length >= 3 && catCountIn.value >= 0) {
                controller.addCat();
            } else {
                controller.showError();

            }
        });
    };

    catImage.addEventListener("click", function() {
        controller.increment();
    });

    controller.init();

})();

/* ====== Handlebars testing ====== */
(function () {
    var context = {
            header1:"Cat Clicker"
        },
        adminForm = document.querySelector(".admin_form"),
        headerSource = document.querySelector("#header-template"),
        headerTemplate = Handlebars.compile(headerSource.innerHTML),

        headerHtml = headerTemplate(context),
        header = document.querySelector(".header_container");

    header.insertAdjacentHTML("afterbegin", headerHtml);

})();