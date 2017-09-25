jQuery(document).ready(function($) {

    function bindEventListeners() {
        $('.bank-account').click(handleBankAccountClick);
    }

    function handleBankAccountClick() {
        let id = $(this).data('id');
        fetchPaymentsForAccount(id);
    }

    function fetchPaymentsForAccount(id) {
        $.get('/api/payments/' + id)
            .done(function(response) {

                bindPayments(response);
            });
    }


    function bindPayments(paymentArray) {
        console.log(paymentArray);

        let paymentContainer = $('.payment-container');
        paymentContainer.html('');

        for(let i in paymentArray) {
            let payment = paymentArray[i];
            let prototype = $('#payment-prototype').val();
            let avatar = payment.counterparty_alias.avatar;
            let icon_uri = '';
            let paymentDate = new Date(payment.created);

            if(avatar === null) {
                icon_uri = 'https://static.useresponse.com/public/bunq/avatars/default-avatar.svg';
            } else {
                icon_uri = '/api/attachment/' + avatar.image[0].attachment_public_uuid;
            }

            prototype = prototype.replace(/__PAYMENT_ICON_URI__/g, icon_uri);
            prototype = prototype.replace(/__COUNTER_PARTY__/g, payment.counterparty_alias.display_name);
            prototype = prototype.replace(/__PAYMENT_DATE__/g, paymentDate.toLocaleString());
            prototype = prototype.replace(/__AMOUNT__/g, payment.amount.value);

            paymentContainer.append(prototype);
        }

    }

    bindEventListeners();
    fetchPaymentsForAccount($('.bank-account:first').data('id'));
});