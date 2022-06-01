$(function(){
    $('.mosaico-pacote').slick({
        centerMode : false,
        slidesToShow : 5,
        slidesToScroll: 3,
        arrows: false,
        infinite: true,
        responsive : [
            {
                breakpoint : 768,
                settings:{
                    arrows:false,
                    centerMode : true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint : 580,
                settings:{
                    arrows : false,
                    centerMode : true,
                    slidesToShow : 2
                }
            },
            {
                breakpoint : 380,
                settings:{
                    arrows:false,
                    centerMode:true,
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.tratamentos .container').slick({
        centerMode: false,
        slidesToShow : 1,
        arrows: false,
        dots: true,
    });

    $('.depoimentos .container').slick({
        slidesToShow: 1,
        arrows: true
    });
});