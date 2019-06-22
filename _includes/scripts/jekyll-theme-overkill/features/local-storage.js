{% raw %}

/**
* Store / restore input values from the local storage
*/

((($, window, document) => {

  if (typeof window.localStorage === 'undefined') {
    console.log('This browser does not support local storage.');
    return false;
  }

  const storage = window.localStorage;

  //const defaultNamespace = `${encodeURIComponent(window.location.pathname)}:`;
  const defaultNamespace = `${window.location.pathname}:`;

  // Store / restore checked definitions

  const $inputs = $(':input').not('[data-local-storage="false"]'); //.filter('[id]');
  if ($inputs && $inputs.length) {
    let $input;
    let $label;
    let name;
    let id;
    let checked;
    let key;
    let value;
    let type;
    let namespace;

    // Restore inputs values from stored values

    $inputs.each((index, element) => {
      $input = $(element);
      $label = $input.parent('.btn');
      name = $input.attr('name');
      id = $input.attr('id');
      //namespace = ($input.is('[data-local-storage-namespace="true"]')) ? defaultNamespace : $input.attr('data-local-storage-namespace');
      namespace = $input.attr('data-local-storage-namespace') || '';
      type = $input.attr('type');

      if (type === 'radio') {
        key = name;
      } else {
        key = id || name;
      }

      /*if (type === 'radio') {
        if (name) {
          key = name;
          value = storage.getItem(namespace + key);
          if (value !== null) {
            value = JSON.parse(value);
            if (value !== null) {
              if (value === $input.attr('value')) {
                $input.prop('checked', true).trigger('click');
                $label.addClass('active');
              }
            }
          }
        }
      } else {
        if (id || name) {
          key = id || name;*/
        if (key) {
          value = storage.getItem(namespace + key);
          if (typeof value !== 'undefined' && value !== 'undefined') {
            value = JSON.parse(value);
            //value = $.parseJSON(value);
            if (value !== null) {
              if (type === 'radio' && value === $input.attr('value')) {
                $input.prop('checked', true).trigger('click');
                $label.addClass('active');
              } else if (type === 'checkbox') {
                $input.prop('checked', value).trigger('click');
                $label.addClass('active');
              } else {
                $input.val(value).trigger('change');
              }
            }
          }
        }
      //}

    });


    // Save input value to the local local storage

    $inputs.on('change input', (event) => {

      $input = $(event.currentTarget);
      name = $input.attr('name');
      value = $input.val();
      id = $input.attr('id');
      //namespace = ($input.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
      namespace = $input.attr('data-local-storage-namespace') || '';
      type = $input.attr('type');
      checked = $input.prop('checked');

      if (type === 'radio') {
        key = name;
      } else {
        key = id || name;
      }

      /*if (type === 'radio') {
        if (name && value) {
          key = name;
          value = JSON.stringify((checked) ? value : null);
          storage.setItem(namespace + key, value);
        }
      } else {
        if (id || name) {
          key = id || name;*/
        if (key) {
          if (type === 'radio') {
            value = JSON.stringify((checked) ? value : null);
          } else if (type === 'checkbox') {
            value = JSON.stringify(checked);
          } else {
            value = JSON.stringify(value);
          }
          storage.setItem(namespace + key, value);

        }
        //console.log('storage.setItem', (namespace + key), value);
      //}

    });
  }


  // Check if Bootstrap is loaded before going further

  if (typeof($.fn.modal) === 'undefined') {
    return false;
  }


  //const defaultNamespace = `${encodeURIComponent(window.location.pathname)}:`;


  /**
  * Keep alerts closed
  */

  let $alert;
  let $collapse;
  let $togglers;
  let key;
  let value;
  let id;
  let namespace;
  const $alerts = $('.alert-dismissible').filter('[id]').not('[data-local-storage="false"]');
  $alerts.each((index, element) => {
    $alert = $(element);
    //namespace = ($alert.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
    namespace = $alert.attr('data-local-storage-namespace');
    key = $alert.attr('id');
    value = JSON.parse(storage.getItem(namespace + key));
    if (value === 'closed') {
      $alert.attr('hidden', '');
    } else {
      $alert.removeAttr('hidden');
    }
  });
  $alerts.on('closed.bs.alert', (event) => {
    $alert = $(event.currentTarget);
    //namespace = ($alert.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
    namespace = $alert.attr('data-local-storage-namespace');
    key = $alert.attr('id');
    value = JSON.stringify('closed');
    storage.setItem(namespace + key, value);
  });



  /**
  * Close alert animation
  */

  /*$alerts = $('.alert-dismissible');
  $alerts.on('close.bs.alert', (event) => {
    $(event.currentTarget).addClass('zoomOutUp');
  });*/



  /**
  * Restore collapsed elements states
  */

  const $collapses = $('.collapse').filter('[id]').not('[data-local-storage="false"]');
  $collapses.on('hidden.bs.collapse', (event) => {
    $collapse = $(event.currentTarget);
    id = $collapse.attr('id');
    if (id) {
      //namespace = ($collapse.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
      namespace = $collapse.attr('data-local-storage-namespace');
      key = `${id}_collapse`;
      value = false;
      storage.removeItem(namespace + key, JSON.stringify(value));
    }
  });
  $collapses.on('shown.bs.collapse', (event) => {
    $collapse = $(event.currentTarget);
    id = $collapse.attr('id');
    if (id) {
      //namespace = ($collapse.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
      namespace = $collapse.attr('data-local-storage-namespace');
      key = `${id}_collapse`;
      value = true;
      storage.setItem(namespace + key, JSON.stringify(value));
    }
  });
  $collapses.each((index, element) => {
    $collapse = $(element);
    id = $collapse.attr('id');
    if (id) {
      $togglers = $(`button[data-target="#${id}"], a[href="#${id}"]`);
      //console.log('toggler', `button[data-target="#${id}"], a[href="#${id}"]`);
      //console.log('$collapse', $collapse);
      //namespace = ($togglers.is('[data-local-storage-namespace="{{ page.url }}"]')) ? defaultNamespace : '';
      namespace = $togglers.attr('data-local-storage-namespace');
      key = `${id}_collapse`;
      value = JSON.parse(storage.getItem(namespace + key));
      if (value === true) {
        $collapse.collapse('show');
        $togglers.addClass('active');
      } else {
        $collapse.collapse('hide');
        $togglers.removeClass('active');
      }
    }
  });

  $('html').addClass('collapse-active');
}))(window.jQuery, window, document);
{% endraw %}
