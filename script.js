$(function() {
  //AjaxでSTATIC FORMSにデータを送信
  $('#submit').on('click', function(event) {
    event.preventDefault();

    let result = inputCheck();

    let error = result.error;
    let message = result.message;

    console.log($('#form').serialize());

    if (error == false) {
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })
    } else {
      alert(message);
    }
  });

  $('#name').blur(function() {
    inputCheck();
  });
  $('#furigana').blur(function() {
    inputCheck();
  });
  $('#email').blur(function() {
    inputCheck();
  });
  $('#phone').blur(function() {
    inputCheck();
  });
  $('#message').blur(function() {
    inputCheck();
  });
  $('#agree').blur(function() {
    inputCheck();
  });

  //お問い合わせフォームの入力チェック
  function inputCheck() {
    let result;

    let message = '';

    let error = false;

    if ($('#name').val() == '') {
      error = true;
      message += 'お名前を入力してください。\n';
    }

    if ($('#furigana').val() == '') {
      error = true;
      message += 'フリガナを入力してください。\n';
    }

    if ($('#message').val() == '') {
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    }

    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    }

    if ($('#phone').val() != '' && $('#phone').val().indexOf('-') == -1) {
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    }

    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    result = {
      error: error,
      message: message
    }

    return result;
  }
});