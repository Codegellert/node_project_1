let closeButton = $('#picture_viewer_close_button');
let pictureViewer = $('#picture_viewer');
let pictureContainerImage = $('#picture_container img');
let pictureViewerImage = $('#picture_viewer_image');
let arrowLeft = $('#arrow_left');
let arrowRight = $('#arrow_right');

closeButton.on('click', () => {
    pictureViewer.css('display','none')
} )


pictureViewerImage.click(() => {
    let newSrc = $('.active_image').next().attr('src');
    pictureViewerImage.attr('src', newSrc);
    $('.active_image').next().attr('class', 'active_image');
    $('.active_image').attr('class', '');
})
var i = 0;

pictureContainerImage.click( (e) => {
    i = $(e.target).index();
    console.log(i);
    let clickedSource = pictureContainerImage.eq(i).attr('src');
    console.log(clickedSource);
    pictureViewerImage.attr('src', clickedSource);
    pictureViewer.css('display','flex');
})

arrowRight.click(() => {
    if(i == pictureContainerImage.length - 1) {
        i = 0;
    }else {
        i++;
    }
    newSrc = pictureContainerImage.eq(i).attr('src');
    pictureViewerImage.attr('src', newSrc);
})
arrowLeft.click(() => {
    if(i == 0) {
        i = pictureContainerImage.length - 1;
        console.log(i);
    }else {
        i--;        
        console.log(i)
    }
    newSrc = pictureContainerImage.eq(i).attr('src');
    pictureViewerImage.attr('src', newSrc);

})