
$(function  () {
	$("button").on("click", function () {
		var num = $(this).attr("iter");
		console.log(this);
		console.log(num);
    selIDnum = "#a" + num;
    emailID = "#e" + num;
    console.log(emailID)

    emailAddress = $(emailID).val();
    console.log(emailAddress);


    to = emailAddress;
    subject = "This the answer you asked in WDI FinalProject for Wan."
    text = $(selIDnum).val();
    // text = $(selIDnum).html();

    console.log(text);
    console.log(to);
    $.get("http://localhost:3000/send", {
      to:to, subject:subject, text:text
    }, function(data) {
      console.log(data);
    })


	});//click
});