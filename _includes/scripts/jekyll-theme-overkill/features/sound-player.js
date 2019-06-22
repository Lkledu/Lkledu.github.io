{% raw %}
(($ => {

  const defaults = {
    container: 'body',
    playerAttributes: {
      class: 'sound-player',
      preload: 'none' // auto, metadata, none
    },
    // https://freesound.org/search/?q=&f=license%3A%22Creative+Commons+0%22+type%3A%22ogg%22&s=duration+asc&advanced=0&g=1
    sounds: []
  };

  const settings = Object.assign({}, defaults, window.soundPlayerConfig);

  $(() => {
    let playerAttributes = [];
    $.each(settings.playerAttributes, (key, value) => {
      playerAttributes.push(`${key}="${value}"`);
    });
    playerAttributes = playerAttributes.join(' ');

    let $player;
    const player = [];
    const promise = [];
    let html = '';
    $.each(settings.sounds, (i, sound) => {
      html = `${html}<audio id="${sound.playerId}" ${playerAttributes} hidden><source src="${sound.filePath}" /></audio>`;
      $(settings.container).on(sound.togglerEvent, sound.togglerSelector, () => {
        //player[i] = $('#' + sound.playerId)[0];
        player[i] = document.getElementById(sound.playerId);
        if (player[i]) {
          if (player[i].readyState > 2 && player[i].currentTime > 0 && !player[i].paused && !player[i].ended) {
            player[i].currentTime = 0;
          } else {
            player[i].pause();
            promise[i] = player[i].play();
            if (promise[i]) {
              promise[i].then(_ => {
              })
              .catch(error => {
              });
            }
          }
        }
      });
    });
    $('body').prepend(html);
  });

}))(jQuery);
{% endraw %}
