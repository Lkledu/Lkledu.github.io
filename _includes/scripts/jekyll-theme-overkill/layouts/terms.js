{% raw %}
(($ => {
$.fn.randomize = function (childElem) {
  return this.each((index, element) => {
      const $element = $(element);
      const $children = $element.children(childElem);
      $children.sort(() => Math.round(Math.random())-0.5);
      $element.detach(childElem);
      $children.each((i, child) => {
        $element.append($(child));
      });
  });
}
}))(jQuery);



((($, window, document) => {
  /*if (window.speechSynthesis) {
    var synth = window.speechSynthesis;
    var voices = [];
    voices = synth.getVoices();
    var speechSynthesisOptions = {
      pitch: 1,
      rate: 1
    }
    console.log('voices', voices);
  }*/


  //var cardStyles = ['', 'bg-light', 'bg-dark text-white', 'bg-primary text-white', 'bg-secondary text-white', 'bg-success text-white', 'bg-danger text-white', 'bg-warning text-white', 'bg-info text-white'];



  /**
  * Encode id string and add a suffix if not unique
  */

  const validIds = [];
  const validId = (string, i) => {
    if (typeof string !== 'string') {
      string = '';
    }
    string = string.trim();

    if (string.length > 0) {
      let id = Base64.encode(string + ((i) ? '_' + i : ''));
      if ($.inArray(id, validIds) === -1) {
        validIds.push(id);
        return id;
      } else {
        ++i;
        return validId(string, i || 2);
      }
    }

    return string;

  };



  /**
  * Convert dl to flexbox cards
  */

  let $dl;
  let $dt;
  let $dd;
  let html;
  let dtHtml;
  let ddHtml;
  let dtText;
  let dtSpeechSynthesisText;
  let ddSpeechSynthesisText;
  let parentText;
  let id;
  let image;
  let tabsHtml;
  let panesHtml;
  let $section;
  let sectionId;
  let sectionLabel;
  let $container = $('.terms');
  let $dls = $container.children('dl');
  //var $nestedDls = $container.find('dl dl, dl ul, dl ol');
  let $nestedDls = $dls.find('dl, ul, ol');
  let $titles = $container.find('h2, h3');
  const namespace = encodeURIComponent(window.location.pathname);

  if ($dls.length) {
    console.time('Definition list generation');


    /**
    * Get the definition language for TTS
    */

    const dtLang = $('html').attr('lang').replace(/^([a-z]{2})$/gi, '$1-$1');
    const dtSpeechSynthesisLang = $('html').attr('lang');
    const ddSpeechSynthesisLang = $('html').attr('data-speech-synthesis-lang');
    //var ddLang = $container.data('speech-synthesis-lang');



    /**
    * Make container flex
    */

    $container
      .addClass('d-flex flex-row flex-wrap align-items-stretch align-self-stretch');



    /**
    * Make text between dls full width
    */

    //$dls.add($titles).first().prevAll().wrapAll('<div class="card m-1 w-100"><div class="card-body"></div></div>');
    $dls
      .nextUntil('dl, h2, h3')
      .add($dls.add($titles).first().prevAll())
      .wrapAll('<div class="card card-info m-1"><div class="card-body"></div></div>');



    /**
     * Convert child dl/ul/ol into tabs
     */

    $nestedDls.each((index, element) => {
      $dl = $(element);
      parentText = $dl.parent('dd').prev('dt').text() || '';
      tabsHtml = '';
      panesHtml = '';
      $dl.find('dd, li').each((index, element) => {
        $dd = $(element);
        $dt = $dd.prev('dt');
        dtHtml = ($dt.length) ? $dt.html() : (index + 1).toString();
        ddHtml = ($dd.length) ? $dd.html() : '';
        dtText = ($dt.length) ? $dt.text() : '';
        dtSpeechSynthesisText = $dt.clone().remove('em, abbr').text();
        ddSpeechSynthesisText = $dd.clone().remove('em, abbr').text();
        /*dtSpeechSynthesisText = dtHtml
          .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/gm, '')
          .replace(/s*\([^()]*\)/gm, '');
        ddSpeechSynthesisText = ddHtml
          .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/gm, '')
          .replace(/s*\([^()]*\)/gm, '');*/
        let id = validId(`${parentText}_${dtText}_pane`);
        let active = (index === 0) ? 'active' : '';
        let show = (index === 0) ? 'show' : '';
        let ariaSelected = (index === 0) ? 'true' : 'false';
        let tabText = dtHtml.replace(/(abbr>)\s+(<abbr)/g, '$1$2');
        let speechSynthesisText = JSON.stringify(ddSpeechSynthesisText);

        tabsHtml = `${tabsHtml}
        <li class="nav-item flex-sm-fill text-sm-center">
        <a class="nav-link ${active}" href="#${id}" data-toggle="tab" role="tab" aria-controls="${id}" aria-selected="${ariaSelected}">
        ${tabText}
        </a>
        </li>`;

        panesHtml = `${panesHtml}
        <div id="${id}" class="tab-pane fade ${show} ${active}" role="tabpanel" aria-labelledby="${id}">
        <p class="card-text speech-synthesis" data-speech-synthesis-text=${speechSynthesisText} data-speech-synthesis-lang="${ddSpeechSynthesisLang}" >
        ${ddHtml}
        </p>
        </div>`;
      });

      let tabContentId = validId(parentText + '_tab-content');

      html = `<div class="card-header">
      <ul class="nav nav-tabs card-header-tabs flex-row" role="tablist">
      ${tabsHtml}
      </ul>
      </div>
      <div class="card-body py-1">
      <div id="${tabContentId}" class="tab-content">
      ${panesHtml}
      </div>
      </div>`;

      $dl.replaceWith(html);

    });



    /**
    * Wrap dt+dd's in Bootstrap cards
    */

    $dls.each((index, element) => {
      $dl = $(element);
      html = '';
      $section = $dl.prev('h2, h3').filter('[id]').first();
      sectionId = $section.attr('id');
      sectionLabel = $section.html();

      $dl.find('dt').each((index, element) => {
        $dt = $(element);
        $dd = $dt.next('dd');
        dtHtml = ($dt.length) ? $dt.html() : '';
        ddHtml = ($dd.length) ? $dd.html() : '';
        dtText = ($dt.length) ? $dt.text() : '';
        dtSpeechSynthesisText = $dt.clone().remove('em, abbr').text();
        ddSpeechSynthesisText = $dd.clone().remove('em, abbr').text();
        /*dtSpeechSynthesisText = dtHtml
          .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/gm, '')
          .replace(/s*\([^()]*\)/gm, '');
        ddSpeechSynthesisText = ddHtml
          .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/gm, '')
          .replace(/s*\([^()]*\)/gm, '');*/
        let id = validId(dtText);

        dtHtml = dtHtml
          .replace(/\(([^()]{2,})\)/g, '<small>($1)</small>')
          .replace(/<abbr( [^>]+)?>\[?(([\w]{1,4})\.)\]?<\/abbr>/gi, '<abbr$1 class="text-$3">$2</abbr>');

        ddHtml = ddHtml
          .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/g, '<span class="text-pronunciation" title="{% endraw %}{{ t.pronunciation }}{% raw %}">$1</span>')
          .replace(/(?!<[^>]*)\“([^<>\r\n\“\”\r\n]*)\”(?![^<]*>)/g, '<span class="text-literatim" title="{% endraw %}{{ t.literatim }}{% raw %}">$1</span>')
          .replace(/<abbr( [^>]+)?>\[?(([\w]{1,4})\.)\]?<\/abbr>/gi, '<abbr$1 class="text-$3">$2</abbr>');

        //var cardStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];
        //var cardStyle = cardStyles[1];
        let cardTitleClass = ((dtHtml.length > 80) ? 'h6' : ((dtHtml.length > 40) ? 'h5' : ''));
        let cardBackFaceBody = ($dd.find('.card-text').length) ? ddHtml : ('<div class="card-body pb-0"><p class="card-text">' + ddHtml + '</p></div>');
        let flipcardAttributes = ((sectionId && index === 0) ? ` id="${sectionId}" data-label="${sectionLabel}"` : ``)
         + ((sectionId) ? ` data-section="${sectionId}"` : ``);

        let cardFrontFaceBody = `<div class="card-body d-flex justify-content-center align-items-center">
         <h4 class="card-title m-0 ${cardTitleClass}">${dtHtml}</h4>
         </div>`;

        let speechSynthesisButton = (window.speechSynthesis) ? `<button
         class="btn btn-sm btn-light text-muted w-100 speech-synthesis"
         data-speech-synthesis-text=` + JSON.stringify(ddSpeechSynthesisText) + `
         data-speech-synthesis-lang="${ddSpeechSynthesisLang}"
         type="button"
         title="{% endraw %}{{ t.listen }}{% raw %}"
         aria-label="{% endraw %}{{ t.listen }}{% raw %}">
         <i class="fas fa-volume-up fa-lg" aria-hidden="false"></i>
         </button>` : ``;

        let cardBackFaceFooter = `<div class="card-footer bg-transparent border-0 p-0">
         <div class="btn-group btn-group-toggle d-flex" data-toggle="buttons">
         <label for="unmemorized_definition_${id}" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.unknown_definition }}{% raw %}">
         <input type="radio" id="unmemorized_definition_${id}" name="memorized_definition_${id}" value="0" class="unmemorized" autocomplete="off" data-local-storage-namespace="{% endraw %}{{ page.url }}{% raw %}" />
         <i class="fas fa-times fa-lg" aria-hidden="false"></i>
         </label>
         ${speechSynthesisButton}
         <label for="memorized_definition_${id}" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.known_definition }}{% raw %}">
         <input type="radio" id="memorized_definition_${id}" name="memorized_definition_${id}" value="1" class="memorized" autocomplete="off" data-local-storage-namespace="{% endraw %}{{ page.url }}{% raw %}" />
         <i class="fas fa-check fa-lg" aria-hidden="false"></i>
         </label>
         </div>
         </div>`;

        html = `${html}
        <div class="term flipcard-wrapper">
        <input type="radio" id="flipcard_position_${id}" name="visible_definition" value="${id}" class="flipcard-position d-none" data-local-storage-namespace="{% endraw %}{{ page.url }}{% raw %}" />
        <div class="card flipcard m-1"${flipcardAttributes}>
        <label for="flipcard_position_${id}" class="m-0">
        <div class="card front-face card-position-absolute bg-dark text-muted">
        ${cardFrontFaceBody}
        </div>
        </label>
        <div class="card back-face bg-white text-dark">
        ${cardBackFaceBody}
        ${cardBackFaceFooter}
        </div>
        </div>
        </div>`;

      });

      // Also add a "no card flipped" radio
      html = `${html}
      <input type="radio" id="flipcard_toggler_none" name="visible_definition" value="none" class="d-none" checked />`;

      $dl.replaceWith(html);

    });




    /**
    * Wrap title's in Bootstrap cards
    */

    let $title;
    let id;
    $titles.each((index, element) => {
      $title = $(element);
      id = $title.attr('id') || encodeURIComponent($title.text());
      $title.replaceWith(`<div class="card front-face card-section bg-primary text-white m-1" data-section="${id}">
      <div class="card-body d-flex text-center">
      <h4 id="${id}" class="card-title font-weight-light m-auto">` + $title.html() + `</h4>
      </div></div>`
      );
    });
    //$titles.addClass('h6 mb-0').wrap('<div class="w-100"></div>');



    /**
     * If there is an image in the dt tag, us it as card image
     */

    $container.find('.card-title img').each((index, element) => {
      const $img = $(element);
      $img.closest('.card-body').removeClass('card-body').addClass('card-img-overlay d-none').before($img);
      $img.addClass('img-fluid card-img lazyloaded').wrap('<div class="ratio-container unknown-ratio-container"></div>');
    });



    /**
    * Initialize the Text To Speech button
    */

    if (typeof speechSynthesisModule !== 'undefined') {
      speechSynthesisModule.addEventListener('.speech-synthesis', 'click');
    }

    /*
    if (synth && voices && dtLang && ddLang) {
      $container.on('click', '.speech-synthesis', (event) => {
        event.preventDefault();
        var $button = $(event.currentTarget);
        var html = $button.closest('.card').find('.card-text').html();
        var $el = $('<div>').html(html);
        $el.find('*').remove();
        var text = $el.text().replace(/s*\([^()]*\)/, '');

        var utterThis = new SpeechSynthesisUtterance(text);
        for (const voice of voices) {
          if (voice.lang === ddLang) {
            utterThis.voice = voice;
            console.log('Selected voice for language', ddLang, voice.name);
          }
        }
        //Object.assign(utterThis, speechSynthesisOptions);
        synth.speak(utterThis);
      });
    }
    */

    /**
    * Initialize the Text To Speech button (voicerss.org)
    */
    /*
    if ($.speech && dtLang && ddLang) {
      $container.on('click', '.speech-synthesis', (event) => {
        event.preventDefault();
        var $button = $(event.currentTarget);
        var html = $button.closest('.card').find('.card-text').html();
        var $el = $('<div>').html(html);
        $el.find('*').remove();
        ttsOptions.hl = ddLang;
        ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
        $.speech(ttsOptions);
        $button.button('toggle');
      });
    }
    */



    /**
    * Toggle memorized card style and store progression
    */

    $container.on('change', 'input[name^="memorized_definition_"]', (event) => {

      const $input = $(event.currentTarget);
      const $parent = $input.parents('.flipcard').first();
      const $card = $parent.find('.card').first();
      const checked = $input.is('[value="1"]:checked');
      $card.toggleClass('bg-dark text-muted', !checked);
      $card.toggleClass('bg-success text-white', checked);

      // Memorize progression
      const $progress = $('.progress');
      if (window.localStorage) {
        const $inputs = $('input[name^="memorized_definition_"][value="1"]');
        //const namespace = encodeURIComponent(window.location.pathname);
        const namespace = $container.attr('data-id');
        const key = 'progress';
        let value = ($inputs.filter(':checked').length / $inputs.length * 100) || 0;

        $progress
          .find('.progress-bar')
          .css('width', `${value}%`)
          .html(`${value.toFixed()}%`)
          .attr('aria-valuenow', value.toFixed());
        value = JSON.stringify(value);
        localStorage.setItem(`${namespace}:${key}`, value);
      } else {
        $progress.hide();
      }

    });



    /**
    * Then unhide post content once everything is in place
    */

    $container.removeClass('spinner spinner-fullscreen spinner-bg fas fa-spinner');



    /**
    * Randomly mix cards when user toggle the option
    */

    $('input[name="randomize"]').on('change', (event) => {
      if ($(event.currentTarget).is('[value="1"]:checked')) {
        $titles.remove();
        $container.find('.card-section').remove();
        $container.find('.card-info').remove();
        $container.randomize('.flipcard-wrapper');
        $('#index').closest('.card').prop('hidden', 'hidden');
      } else {
        location.reload();
      }
    });



    console.timeEnd('Definition list generation');
  }
}))(window.jQuery, window, document);
{% endraw %}
