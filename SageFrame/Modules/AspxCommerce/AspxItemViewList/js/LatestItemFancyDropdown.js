function MakeFancyItemDropDown(dropdownID) {
    // The select element to be replaced:
    var select = $('select.makeMeFancydropdown_' + dropdownID);

    var selectBoxContainer = $('<div>', {
        width: select.outerWidth(),
        className: 'itemSelect',
        html: '<div class="selectBox"></div>'
    });

    var dropDown = $('<ul>', { className: 'dropDown' });
    var selectBox = selectBoxContainer.find('.selectBox');

    // Looping though the options of the original select element

    select.find('option').each(function(i) {
        var option = $(this);

        if (i == select.attr('selectedIndex')) {
            selectBox.html(option.text());
        }

        // As of jQuery 1.4.3 we can access HTML5 
        // data attributes with the data() method.

        if (option.data('skip')) {
            return true;
        }

        // Creating a dropdown item according to the
        // data-icon and data-html-text HTML5 attributes:

        var li = $('<li>', {
            html: '<span>' + option.data('html-text') + '</span>'
        });

        li.click(function() {

            selectBox.html(option.text());
            dropDown.trigger('hide');

            // When a click occurs, we are also reflecting
            // the change on the original select element:
            //selectBox.html(select.find(':selected').text());
            //select.val(option.val());
            select.val(option.val()).trigger('change');

            //for removing the selected class from li
            $('.makeMeFancydropdown_' + dropdownID).parent('div').find('.itemSelect ul li').each(function(index) {
                $(this).removeClass('selected');
            });
            return false;
        });

        dropDown.append(li);
    });

    selectBoxContainer.append(dropDown.hide());
    select.hide().after(selectBoxContainer);

    // Binding custom show and hide events on the dropDown:

    dropDown.bind('show', function() {

        if (dropDown.is(':animated')) {
            return false;
        }

        selectBox.addClass('expanded');
        dropDown.slideDown();
        //add selected class for selected li
        var divValue = $('.makeMeFancydropdown_' + dropdownID + ' option:selected').text();
        $('.makeMeFancydropdown_' + dropdownID).parent('div').find('.itemSelect ul li').each(function(index) {
            var liValue = $(this).find('span').html();
            if (divValue == liValue) {
                $(this).addClass('selected');
            }
        });
    }).bind('hide', function() {

        if (dropDown.is(':animated')) {
            return false;
        }

        selectBox.removeClass('expanded');
        dropDown.slideUp();

    }).bind('toggle', function() {
        if (selectBox.hasClass('expanded')) {
            dropDown.trigger('hide');
        }
        else dropDown.trigger('show');
    });

    selectBox.click(function() {
        dropDown.trigger('toggle');
        return false;
    });

    // If we click anywhere on the page, while the
    // dropdown is shown, it is going to be hidden:

    $(document).click(function() {
        dropDown.trigger('hide');
    });
}