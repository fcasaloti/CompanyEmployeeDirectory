'use strict';

//Listener waiting document to be ready
$(document).ready(function () {
    getData();
});

//Execute AJAX to get data from randomuser
function getData() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=12&key=S1AE-MM04-U1JO-M730',
        dataType: 'json',
        success: function (data) {
            //Call function to create Cards using data from AJAX results
            createCard(data.results);
            //Listener calling function to create Modal Cards when user click on one card
            $('.card').click(function () {
                let userSet = Number($(this).attr("id"));
                console.log(userSet);
                createModal(data.results, userSet)
            });
        }
    });
}

//Function to create Cards with data received from AJAX
function createCard(usersDirectory) {
    $(usersDirectory).each(function (index) {
        let cardUser =
            `<div class="card" id=
                ${index}
            >
                <div class="card-img-container">
                    <img class="card-img" src="
                        ${usersDirectory[index].picture.medium}
                    " alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">
                        ${usersDirectory[index].name.first} 
                        ${usersDirectory[index].name.last}
                    </h3>
                    <p class="card-text">
                        ${usersDirectory[index].email}
                    </p>
                    <p class="card-text cap">
                        ${usersDirectory[index].location.city}, 
                        ${usersDirectory[index].location.state}
                    </p>
                </div>
            </div>`;

        $('.gallery').append(cardUser)
    })
};

//Function to create Modal Card when an user click on a card
function createModal(userDir, userSelection) {
    let birth = new Date(userDir[userSelection].dob.date);
    let birthYear = birth.getFullYear();
    let birthMonth = birth.getMonth();
    let birthDay = birth.getDay();
    let modalPage =
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="
                        ${userDir[userSelection].picture.medium}
                    " alt="profile picture">
                    <h3 id="name" class="modal-name cap">
                        ${userDir[userSelection].name.first} 
                        ${userDir[userSelection].name.last}
                    </h3>
                    <p class="modal-text">
                        ${userDir[userSelection].email}
                    </p>
                    <p class="modal-text cap">
                        ${userDir[userSelection].location.city}
                    </p>
                    <hr>
                    <p class="modal-text">
                        ${userDir[userSelection].phone}
                    </p>
                    <p class="modal-text">
                        ${userDir[userSelection].location.street.number} 
                        ${userDir[userSelection].location.street.name}, 
                        ${userDir[userSelection].location.state}, 
                        ${userDir[userSelection].location.city} 
                        ${userDir[userSelection].location.postcode}
                    </p>
                    <p class="modal-text">Birthday: 
                        ${birthYear}-${birthMonth}-${birthDay}
                    </p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
    $('body').append(modalPage)

    //Listener to close modal card when user click on the upper right X
    $(".modal-close-btn").click(function () {
        $(".modal-container").remove();
    });

    //Listener to move to the previous card
    $('.modal-prev').click(function () {
        $(".modal-container").remove();
        if (userSelection == 0) {
            $(".card").remove();
            $(".modal-container").remove();
            getData();
            console.log(0);
        }
        else {
            let newUser = userSelection - 1;
            createModal(userDir, newUser);
            console.log(newUser);
        }
    });

    //Listener to move to the next card
    $('.modal-next').click(function () {
        $(".modal-container").remove();
        if (userSelection == 11) {
            $(".card").remove();
            $(".modal-container").remove();
            getData();
            console.log(11);
        }
        else {
            let newUser = userSelection + 1;
            createModal(userDir, newUser);
            console.log(newUser);
        }
    });
};