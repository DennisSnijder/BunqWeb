$(function() {
    function bindEventListeners() {
        $('.bank-account').click(handleBankAccountClick);
    }

    function handleBankAccountClick() {
        let id = $(this).data('id');
        fetchPaymentsForAccount(id);
    }

    function fetchPaymentsForAccount(id) {
        $.get('/api/payments/' + id)
            .done(bindPayments)
    }


    function bindPayments(paymentArray) {
        var paymentContainer = $('.payment-container');
        paymentContainer.html('');

        paymentArray.forEach(function(payment) {
            var prototype = $('#payment-prototype').val();
            var avatar = payment.counterparty_alias.avatar;
            var icon_uri = 'https://static.useresponse.com/public/bunq/avatars/default-avatar.svg';
            var paymentDate = new Date(payment.created);

            if(avatar) {
                icon_uri = '/api/attachment/' + avatar.image[0].attachment_public_uuid;
            }

            prototype = prototype.replace(/__PAYMENT_ICON_URI__/g, icon_uri);
            prototype = prototype.replace(/__COUNTER_PARTY__/g, payment.counterparty_alias.display_name);
            prototype = prototype.replace(/__PAYMENT_DATE__/g, paymentDate.toLocaleString());
            prototype = prototype.replace(/__AMOUNT__/g, payment.amount.value);

            paymentContainer.append(prototype);
        });
    }

    // bindEventListeners();
    // fetchPaymentsForAccount($('.bank-account:first').data('id'));
});