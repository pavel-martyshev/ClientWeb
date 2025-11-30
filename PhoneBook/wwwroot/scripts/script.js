"use strict";

(function() {
    let contacts = [];
    let editedContactId = "";
    let contactToRemoveId = "";

    function validateInputsValues(lastNameInput, firstNameInput, phoneNumberInput, isNew = false) {
        const namesPattern = /[^A-Za-zА-Яа-я-]+$/g;
        let isValid = true;

        const lastNameValue = lastNameInput.val().trim();

        if (Boolean(lastNameValue.match(namesPattern)) || lastNameValue === "") {
            lastNameInput.addClass("incorrect-input");

            if (editedContactId) {
                $(".edit-last-name-incorrect-input-message").removeClass("d-none").addClass("d-block");
            } else {
                $(".form-last-name-incorrect-input-message").removeClass("d-none").addClass("d-block");
            }

            isValid = false;
        }

        const firstNameValue = firstNameInput.val().trim();

        if (Boolean(firstNameValue.match(namesPattern)) || firstNameValue === "") {
            firstNameInput.addClass("incorrect-input");

            if (editedContactId) {
                $(".edit-first-name-incorrect-input-message").removeClass("d-none").addClass("d-block");
            } else {
                $(".form-first-name-incorrect-input-message").removeClass("d-none").addClass("d-block");
            }
            
            isValid = false;
        }

        const phoneNumberValue = phoneNumberInput.val().trim();

        if (!Boolean(phoneNumberValue.match(/^\d{10}$/g)) || phoneNumberValue === "") {
            phoneNumberInput.addClass("incorrect-input");

            if (editedContactId) {
                $(".edit-phone-number-incorrect-input-message").removeClass("d-none").addClass("d-block");
            } else {
                $(".form-phone-number-incorrect-input-message").removeClass("d-none").addClass("d-block");
            }
            
            isValid = false;
        }

        $.each(contacts, (index, contact) => {
            if (contact.phoneNumber === phoneNumberValue) {                  
                if (editedContactId && editedContactId !== `contact-${index}`) {
                    phoneNumberInput.addClass("incorrect-input");

                    $(".edited-number-exists-error")
                        .removeClass("d-none")
                        .addClass("d-block");

                    isValid = false;
                    return false;
                } 

                if (isNew) {
                    phoneNumberInput.addClass("incorrect-input");

                    $(".number-exists-error")
                        .removeClass("d-none")
                        .addClass("d-block");
                    
                    isValid = false;
                    return false;
                }
            }
        })

        return isValid;
    }

    function enableSubmitButton() {
        const submitBtn = $(".submit-button");

        if ($("#last-name-input").val() && $("#first-name-input").val() && $("#phone-number-input").val()) {
            submitBtn.prop("disabled", false);
        } else {
            submitBtn.prop("disabled", true);
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
        const removeGroupBtn = $(".remove-group-button");
        const checkedContactCheckbox = $(".contact-checkbox:checked");

        if (checkedContactCheckbox.length > 0) {
            removeGroupBtn.prop("disabled", false);

            if (checkedContactCheckbox.length === contacts.length) {
                $(".thead-checkbox").prop("checked", true);
            }
        } else {
            removeGroupBtn.prop("disabled", true);
            $(".thead-checkbox").prop("checked", false);
        }
    }

    function renderPhoneBookTable(filteredContacts) {
        $(".thead-checkbox").prop("checked", false);
        const phoneBookToRender = filteredContacts || contacts;

        const tbodyHtml = phoneBookToRender.map((value, i) =>
            `<tr id="contact-${i}">
                <td class="text-center"><input type="checkbox" class="contact-checkbox form-check-input"></td>
                <td class="contact-number text-center">${i + 1}</td>
                <td class="last-name">${value.lastName}</td>
                <td class="first-name">${value.firstName}</td>
                <td class="phone-number">+7${value.phoneNumber}</td>
                <td><div class="table-button edit-button" title="Редактировать контакт"></div></td>
                <td><div class="table-button remove-button" data-bs-toggle="modal" data-bs-target="#remove-confirmation-modal" title="Удалить контакт"></div></td>
            </tr>`
        ).join("");

        $(".contacts-table-tbody").html(tbodyHtml);
        $(".edit-button").click(goToContactEdit);
        $(".remove-button").click(showRemoveConfirmationModal);
        $(".contact-checkbox").click(turnOnOffRemoveGroupButton);
    }

    function goToContactEdit(e) {
        const tr = $(e.target).closest("tr");

        editedContactId = tr.attr("id");
        let lastNameElement = tr.find(".last-name");
        let firstNameElement = tr.find(".first-name");
        let phoneNumberElement = tr.find(".phone-number");

        const lastName = lastNameElement.text();
        const firstName = firstNameElement.text();
        let phoneNumber = phoneNumberElement.text();
        phoneNumber = phoneNumber.replace("+7", "");

        lastNameElement.remove();
        firstNameElement.remove();
        phoneNumberElement.remove();

        lastNameElement = $(
            `
            <td class='last-name'><input type='text' class='form-control' id='edited-last-name-input'>
                <p class="edit-last-name-incorrect-input-message mb-0 d-none text-danger">Некорректный формат</p>
            </td>
            `
        );
        firstNameElement = $(
            `
            <td class='first-name'><input type='text' class='form-control' id='edited-first-name-input'>
                <p class="edit-first-name-incorrect-input-message mb-0 d-none text-danger">Некорректный формат</p>
            </td>
            `
        );
        phoneNumberElement = $(
            `
            <td class='phone-number'><input type='text' class='form-control' id='edited-phone-number-input'>
                <p class="edit-phone-number-incorrect-input-message mb-0 d-none text-danger">Некорректный формат</p>
                <span class="edited-number-exists-error d-none text-danger">Такой номер уже существует</span>
            </td>
            `
        );

        lastNameElement.find(".form-control").val(lastName);
        firstNameElement.find(".form-control").val(firstName);
        phoneNumberElement.find(".form-control").val(phoneNumber);

        tr.find(".contact-number").after(lastNameElement, firstNameElement,phoneNumberElement);
        tr.find(".edit-button")
            .off()
            .click(saveEditedContact)
            .attr("title", "Сохранить изменения")
            .addClass("save-button")
            .removeClass("edit-button");
    }

    function removeContacts() {
        if (contactToRemoveId) {
            contacts.splice(contactToRemoveId.slice(8), 1);
            $(`#${contactToRemoveId}`).remove();

            contactToRemoveId = "";
            renderPhoneBookTable();

            return;
        }

        const phoneNumbersToRemove = [];

        $(".contact-checkbox:checked").each((i, checkbox) => {
            const tr = $(checkbox).closest("tr");
            phoneNumbersToRemove.push(tr.find(".phone-number").text().replace("+7", ""));
            tr.remove();
        });

        contacts = contacts.filter(contact => !phoneNumbersToRemove.includes(contact.phoneNumber));
        $("thead-checkbox").prop("checked", false);
        turnOnOffRemoveGroupButton();

        renderPhoneBookTable();
    }

    function saveEditedContact(e) {
        $(".edit-last-name-incorrect-input-message").removeClass("d-block").addClass("d-none");
        $(".edit-first-name-incorrect-input-message").removeClass("d-block").addClass("d-none");
        $(".edit-phone-number-incorrect-input-message").removeClass("d-block").addClass("d-none");

        const tr = $(e.target).closest("tr");
        let lastNameElement = tr.find(".last-name");
        let firstNameElement = tr.find(".first-name");
        let phoneNumberElement = tr.find(".phone-number");

        const lastNameInputElement = lastNameElement.find("input");
        const firstNameInputElement = firstNameElement.find("input");
        const phoneNumberInputElement = phoneNumberElement.find("input");

        lastNameInputElement.removeClass("incorrect-input");
        firstNameInputElement.removeClass("incorrect-input");
        phoneNumberInputElement.removeClass("incorrect-input");

        if (validateInputsValues(lastNameInputElement, firstNameInputElement, phoneNumberInputElement)) {
            editedContactId = "";

            const lastName = lastNameInputElement.val();
            const firstName = firstNameInputElement.val();
            let phoneNumber = phoneNumberInputElement.val();
            phoneNumber = phoneNumber.replace("+7", "");

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
                .attr("title", "Редактировать контакт")
                .addClass("edit-button")
                .removeClass("save-button");
        }
    }

    function saveNewContact(lastName, firstName, phoneNumber) {
        contacts.push({lastName, firstName, phoneNumber});
        renderPhoneBookTable();
    }

    function showRemoveConfirmationModal(e) {
        const removeConfirmationModal = $("#remove-confirmation-modal");
        const buttonElement = $(e.target);

        if (buttonElement.hasClass("remove-group-button")) {
            removeConfirmationModal.find(".remove-modal-message").text("Вы действительно хотите удалить выбранные контакты?");
        } else if (buttonElement.hasClass("remove-button")) {
            const tr = buttonElement.closest("tr");
            contactToRemoveId = tr.attr("id");

            removeConfirmationModal
                .find(".remove-modal-message")
                .text(`Вы действительно хотите удалить выбранный контакт ${tr.find(".last-name").text()} ${tr.find(".first-name").text()}?`);
        }
    }

    function checkAllCheckBoxes() {
        $(".contact-checkbox").prop("checked", $(".thead-checkbox").prop("checked"));
        turnOnOffRemoveGroupButton();
    }

    function applyFilter() {
        const filterValue = $("#filter-input").val().trim();
        const filteredContacts = contacts.filter(c => 
            c.firstName.toLowerCase().includes(filterValue.toLowerCase()) || 
            c.lastName.toLowerCase().includes(filterValue.toLowerCase()) || 
            c.phoneNumber.toLowerCase().includes(filterValue.toLowerCase())
        );
        renderPhoneBookTable(filteredContacts);
    }

    function resetFilter(){
        $("#filter-input").val("");
        renderPhoneBookTable();
    }

    $(() => {
        $(".remove-group-button").click(showRemoveConfirmationModal);
        $(".contact-checkbox").click(turnOnOffRemoveGroupButton);
        $(".thead-checkbox").click(checkAllCheckBoxes);
        $(".remove-confirm-button").click(removeContacts);

        $(".apply-filter-button").click(applyFilter);
        $(".reset-filter-button").click(resetFilter);

        const lastNameInput = $("#last-name-input").on("input", enableSubmitButton);
        const firstNameInput = $("#first-name-input").on("input", enableSubmitButton);
        const phoneNumberInput = $("#phone-number-input").on("input", enableSubmitButton);

        $(".new-contact-form").submit(() => {
            clearValidateErrors();
            $(".form-last-name-incorrect-input-message").removeClass("d-block").addClass("d-none");
            $(".form-first-name-incorrect-input-message").removeClass("d-block").addClass("d-none");
            $(".form-phone-number-incorrect-input-message").removeClass("d-block").addClass("d-none");

            if (validateInputsValues(lastNameInput, firstNameInput, phoneNumberInput, true)) {
                saveNewContact(
                    lastNameInput.val().trim(), 
                    firstNameInput.val().trim(), 
                    phoneNumberInput.val().trim()
                );

                lastNameInput.val("");
                firstNameInput.val("");
                phoneNumberInput.val("");
                $(".submit-button").prop("disabled", true);
                clearValidateErrors();
            }

            return false;
        })

        if (contacts.length > 0) {
            renderPhoneBookTable();
        }
    });
})();
