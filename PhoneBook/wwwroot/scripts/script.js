"use strict";

(function() {
    let phoneBook = [];

    function setIncorrectInputClass(inputElement) {
        inputElement.addClass("incorrect-input");
    }

    function validateInputsValues(lastNameInput, firstNameInput, phoneNumberInput, isNew = false) {
        const namesPattern = /[^A-Za-zА-Яа-я]+$/g;
        let isNotErrors = true;

        if (Boolean(lastNameInput.val().trim().match(namesPattern))) {
            setIncorrectInputClass(lastNameInput);
            isNotErrors = false;
        }

        if (Boolean(firstNameInput.val().trim().match(namesPattern))) {
            setIncorrectInputClass(firstNameInput);
            isNotErrors = false;
        }

        const phoneNumber = phoneNumberInput.val().trim();

        if (!Boolean(phoneNumber.match(/^\d{10}$/g))) {
            setIncorrectInputClass(phoneNumberInput);
            isNotErrors = false;
        }

        if (isNew) {
            for (const contact of phoneBook) {
                if (contact.phoneNumber === phoneNumber) {
                    $(".number-exists-error")
                        .removeClass("d-none")
                        .addClass("d-block");

                    isNotErrors = false;
                    break;
                }
            }
        }

        return isNotErrors;
    }

    function enableSubmitButton() {
        const submitBtn = $(".submit-btn");

        if ($("#last-name-input").val() && $("#first-name-input").val() && $("#phone-number-input").val()) {
            submitBtn.removeAttr("disabled");
        } else {
            submitBtn.attr("disabled", true);
        }
    }

    function clearValidateErrors() {
        $("#last-name-input").removeClass("incorrect-input");
        $("#first-name-input").removeClass("incorrect-input");
        $("#phone-number-input").removeClass("incorrect-input");

        $(".number-exists-error")
            .removeClass("d-block")
            .addClass("d-none");
    }
    
    function turnOnOffRemoveGroupButton() {
        const removeGroupBtn = $(".remove-group-btn");
        const checkedContactCheckbox = $(".contact-checkbox:checked");

        if (checkedContactCheckbox.length > 0) {
            removeGroupBtn.prop("disabled", false);

            if (checkedContactCheckbox.length === phoneBook.length) {
                $(".thead-checkbox").prop("checked", true);
            }
        } else {
            removeGroupBtn.prop("disabled", true);
            $(".thead-checkbox").prop("checked", false);
        }
    }

    function renderPhoneBookTable(filteredPhoneBook) {
        $(".thead-checkbox").prop("checked", false);

        const phoneBookToRender = filteredPhoneBook || phoneBook;

        const tbodyHtml = phoneBookToRender.map((value, i) =>
            `
            <tr id="contact-${i}">
                <td class="text-center"><input type="checkbox" class="contact-checkbox form-check-input" id="exampleCheck1"></td>
                <td class="contact-number text-center">${i + 1}</td>
                <td class="last-name">${value.lastName}</td>
                <td class="first-name">${value.firstName}</td>
                <td class="phone-number">+7${value.phoneNumber}</td>
                <td><div class="table-button edit-button"></div></td>
                <td><div class="table-button delete-button"></div></td>
            </tr>
            `
        ).join("");

        $("tbody").html(tbodyHtml);
        $(".edit-button").click(goToContactEdit);
        $(".delete-button").click(removeContact);
        $(".contact-checkbox").click(turnOnOffRemoveGroupButton);
    }

    function goToContactEdit(e) {
        const tr = $(e.target).closest("tr");
        let lastNameElement = tr.find(".last-name");
        let firstNameElement = tr.find(".first-name");
        let phoneNumberElement = tr.find(".phone-number");

        const lastName = lastNameElement.text();
        const firstName = firstNameElement.text();
        let phoneNumber = phoneNumberElement.text();
        phoneNumber = phoneNumber.replace("+7", "")

        lastNameElement.remove();
        firstNameElement.remove();
        phoneNumberElement.remove();

        lastNameElement = $("<td class='last-name'><input type='text' class='form-control' id='edited-last-name-input'></td>");
        firstNameElement = $("<td class='first-name'><input type='text' class='form-control' id='edited-first-name-input'></td>");
        phoneNumberElement = $("<td class='phone-number'><input type='text' class='form-control' id='edited-phone-number-input'></td>");

        lastNameElement.find(".form-control").val(lastName);
        firstNameElement.find(".form-control").val(firstName);
        phoneNumberElement.find(".form-control").val(phoneNumber);

        tr.find(".contact-number").after(lastNameElement, firstNameElement,phoneNumberElement);
        tr.find(".edit-button")
            .off()
            .click(saveEditedContact)
            .addClass("save-button")
            .removeClass("edit-button");
    }

    function removeContact(e) {
        const tr = $(e.target).closest("tr");
        console.log(tr);

        if (window.confirm(`Вы действительно хотите удалить выбранный контакт ${tr.find(".last-name").text()} ${tr.find(".first-name").text()}?`)) {
            phoneBook.splice(tr.attr("id"), 1);
            tr.remove();
            renderPhoneBookTable();
        }
    }

    function saveEditedContact(e) {
        const tr = $(e.target).closest("tr");
        let lastNameElement = tr.find(".last-name");
        let firstNameElement = tr.find(".first-name");
        let phoneNumberElement = tr.find(".phone-number");

        const lastNameInputElement = lastNameElement.find("input");
        const firstNameInputElement = firstNameElement.find("input");
        const phoneNumberInputElement = phoneNumberElement.find("input");

        if (validateInputsValues(lastNameInputElement, firstNameInputElement, phoneNumberInputElement)) {
            const lastName = lastNameInputElement.val();
            const firstName = firstNameInputElement.val();
            let phoneNumber = phoneNumberInputElement.val();
            phoneNumber = phoneNumber.replace("+7", "")

            lastNameElement.remove();
            firstNameElement.remove();
            phoneNumberElement.remove();

            lastNameElement = $(`<td class="last-name">${lastName}</td>`);
            firstNameElement = $(`<td class="first-name">${firstName}</td>`);
            phoneNumberElement = $(`<td class="phone-number">+7${phoneNumber}</td>`);

            tr.find(".contact-number").after(lastNameElement, firstNameElement,phoneNumberElement);
            tr.find(".save-button")
                .off()
                .click(goToContactEdit)
                .addClass("edit-button")
                .removeClass("save-button");
        }
    }

    function saveNewContact(lastName, firstName, phoneNumber) {
        phoneBook.push(
            {
                lastName: lastName,
                firstName: firstName,
                phoneNumber: phoneNumber
            }
        );

        renderPhoneBookTable();
    }

    function removeContactsGroup() {
        if (window.confirm("Вы действительно хотите удалить выбранные контакты?")) {
            const phoneNumbersToRemove = [];

            $(".contact-checkbox:checked").each((i, checkbox) => {
                const tr = $(checkbox).closest("tr");
                phoneNumbersToRemove.push(tr.find(".phone-number").text().replace("+7", ""));
                tr.remove();
            });

            phoneBook = phoneBook.filter(contact => !phoneNumbersToRemove.includes(contact.phoneNumber));

            $("thead-checkbox").prop("checked", false);
            turnOnOffRemoveGroupButton();

            renderPhoneBookTable();
        }
    }

    function checkAllCheckBoxes() {
        $(".contact-checkbox").prop('checked', $(".thead-checkbox").prop("checked"));
        turnOnOffRemoveGroupButton();
    }

    function applyFilter() {
        const filterValue = $("#filter-input").val().trim();
        const filteredPhoneBook = phoneBook.filter(c => c.firstName.includes(filterValue) || c.lastName.includes(filterValue) || c.phoneNumber.includes(filterValue));
        renderPhoneBookTable(filteredPhoneBook);
    }

    function resetFilter(){
        $("#filter-input").val("");
        renderPhoneBookTable();
    }

    $(() => {
        $(".remove-group-btn").click(removeContactsGroup);
        $(".contact-checkbox").click(turnOnOffRemoveGroupButton);
        $(".thead-checkbox").click(checkAllCheckBoxes);

        $(".apply-filter-btn").click(applyFilter);
        $(".reset-filter-btn").click(resetFilter);

        const lastNameInput = $("#last-name-input").on("input", enableSubmitButton);
        const firstNameInput = $("#first-name-input").on("input", enableSubmitButton);
        const phoneNumberInput = $("#phone-number-input").on("input", enableSubmitButton);

        $(".new-contact-form").on("submit", () => {
            clearValidateErrors();

            if (validateInputsValues(lastNameInput, firstNameInput, phoneNumberInput, true)) {
                saveNewContact(
                    lastNameInput.val().trim(), 
                    firstNameInput.val().trim(), 
                    phoneNumberInput.val().trim()
                );

                lastNameInput.val("");
                firstNameInput.val("");
                phoneNumberInput.val("");
                $(".submit-btn").attr("disabled", true);
                clearValidateErrors();
            }

            return false;
        })
    });
})();
