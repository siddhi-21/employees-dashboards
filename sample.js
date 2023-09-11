fetch("employeeDate.json")
    .then((res) => res.json())
    .then((data) => {
        displayProducts(data);
        filterBirthdays(data);
        newJoinee(data);
    });
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

async function displayProducts(products) {
    let html = "";
    await products.forEach((product) => {
        html += `<tr>
    <td>
                <img src="${product.avatar}" style="width:50px;height:50px;border-radius:50%" alt="">
             </td>
            <td>${product.first_name} ${product.last_name}</td>
            <td>${product.dept}</td>
            <td>${product.email}</td>
            <td>${product.designation}</td>
            <td>${product.phone}</td>
            
            </tr>
            `;
    });
    document.querySelector("tbody").innerHTML = await html;
    //
    $(document).ready(function () {
        $("#example").DataTable({
            searching: true,
            processing: true,
            paging: true,
            pageLength: 10,
            initComplete: function () {
                this.api()
                    .columns()
                    .every(function () {
                        let column = this;
                        let title = column.footer().textContent;

                        // Create input element
                        let input = document.createElement("input");
                        input.placeholder = title;
                        column.footer().replaceChildren(input);

                        // Event listener for user input
                        input.addEventListener("keyup", () => {
                            if (column.search() !== this.value) {
                                column.search(input.value).draw();
                            }
                        });
                    });
            },
        });
    });
}

async function newJoinee(data) {
    let obj = [];
    let dept = [];
    await data.forEach(function (newJOinee) {
        let dateOfNewJoine = new Date(newJOinee.DOJ);
        dept.push(newJOinee.designation);
        obj.push(dateOfNewJoine);
    });
    obj = obj.sort();

    let dateOfNewJoinee = [];
    for (let i = 0; i < obj.length; i++) {
        let newDate = obj[i].getDate();
        if (Number(obj[i].getDate()) <= 9) {
            newDate = "0" + obj[i].getDate();
        }

        let newMonth = Number(obj[i].getMonth()) + 1;

        if (Number(obj[i].getMonth()) + 1 < 10) {
            newMonth = "0" + String(Number(obj[i].getMonth()) + 1);
        }
        let newYear = obj[i].getFullYear();
        dateOfNewJoinee.push(`${newYear}-${newMonth}-${newDate}`);
    }

    dateOfNewJoinee = dateOfNewJoinee.sort().reverse();

    let owl_carousel = document.querySelector(".owl-carousel");
    for (let i = 0; i < dateOfNewJoinee.length; i++) {
        let div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<div class="card">
    <h6 class="card-title dateJoinee">${dateOfNewJoinee[i]}</h6>
    <img class="imgJoinee card-img-top " src="img/gentlemenImg/man1.jpg" alt="Card image cap">
    <div class="card-body">
          
      <p class="joineeInfo">George Bluth <br> <span>Admin Exe</span>
      </p>
     
    </div>
  </div>`;
        owl_carousel.append(div);
    }

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 3,
                nav: false,
            },
            1000: {
                items: 5,
                nav: true,
                loop: false,
            },
        },
    });
}

async function filterBirthdays(filterBirthday_data) {
    let birthdays = [];
    filterBirthday_data.forEach((element) => {
        birthdays.push(element.DOB);
    });
    // Count the number of birthdays for each week
    let thisWeekCount = 0;
    let pastWeekCount = 0;
    let upcomingCount = 0;
    for (let i = 0; i < birthdays.length; i++) {
        let birthday = birthdays[i];
        let date = new Date(birthday);
        //console.log(date.getWeek(),new Date().getWeek());


        if (date.getWeek() === new Date().getWeek()) {
            thisWeekCount++;
            console.log(thisWeekCount);
        }
        else if (date.getWeek() == new Date().getWeek() - 1) {
            pastWeekCount++;
        }
        else {
            upcomingCount++;
        }
        console.log(thisWeekCount, pastWeekCount, upcomingCount);


    }
    // Set the button text with the number of birthdays
    $("#thisWeek").text("This Week ( " + thisWeekCount + " )");
    $("#pastWeek").text("Past Week ( " + pastWeekCount + " )");
    $("#upcoming").text("Upcoming ( " + upcomingCount + " )");

    // Load the birthdays for the current week
    $("#thisWeek").click(function () {
        $("#birthdays").html("");
        for (var i = 0; i < thisWeekCount; i++) {
            let birthday = birthdays[i];
            let date = new Date(birthday);
            var html = "<div class=\"card text-center\">";
            html += "<img class=\"card-img-top imgBirthday text-center \" src=\"" + filterBirthday_data[i].avatar + "\" alt=\"\">";
            html += "<div class=\"card-body\">";
            html += "<h5 class=\"card-title\">" + filterBirthday_data[i].first_name + "</h5>";

            html += "<p class=\"card-text\">" + date.toDateString() + "</p>";
            html += "</div>";
            html += "</div>";

            $("#birthdays").append(html);
        }
    });
    // Load the birthdays for the past week
    $("#pastWeek").click(function () {
        $("#birthdays").html("");
        for (var i = thisWeekCount; i < thisWeekCount + pastWeekCount; i++) {
            var birthday = birthdays[i];
            var date = new Date(birthday);
            var html = "<div class=\"card text-center\">";
            html += "<img class=\"card-img-top imgBirthday \" src=\"" + filterBirthday_data[i].avatar + "\" alt=\"\">";
            html += "<div class=\"card-body\">";
            html += "<h5 class=\"card-title\">" + filterBirthday_data[i].first_name + "</h5>";

            html += "<p class=\"card-text\">" + date.toDateString() + "</p>";
            html += "</div>";
            html += "</div>";
            $("#birthdays").append(html);
        }
    });
    $("#upcoming").click(function(){
        $("#birthdays").html("");
        for (var i = 0; i < upcomingCount; i++) {
            let birthday = birthdays[i];
            let date = new Date(birthday);
            var html = "<div class=\"card text-center\">";
            html += "<img class=\"card-img-top imgBirthday text-center \" src=\"" + filterBirthday_data[i].avatar + "\" alt=\"\">";
            html += "<div class=\"card-body\">";
            html += "<h5 class=\"card-title\">" + filterBirthday_data[i].first_name + "</h5>";

            html += "<p class=\"card-text\">" + date.toDateString() + "</p>";
          
            html += "</div>";
            html += "</div>";

            $("#birthdays").append(html);
        }
    })
}

