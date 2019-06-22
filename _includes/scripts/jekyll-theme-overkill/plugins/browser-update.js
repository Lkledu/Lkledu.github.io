{% raw %}

$buoop = {

    notify: {i:-5,f:-4,o:-4,s:-2,c:-4},
    // Spécifie les versions du navigateur à notifier. Les nombres négatifs indiquent le nombre de version derrière la version actuelle à notifier.
    // f:22 ---> Firefox <= 22
    // c:-5 ---> Chrome <= 35 if current Chrome version is 40.
    // c:"-5m" ---> Chrome versions which are older than 3 months

    //reminder: 24,
    // après combien d'heures le message devrait-il réapparaître
    // 0 = toujours afficher

    //reminderClosed: 150,
    // si le visiteur ferme explicitement le message, il réapparaît après x heures

    //onshow: (infos) =>{},
    //onclick: (infos) =>{},
    //onclose: (infos) =>{},
    // fonctions de rappel après que la notification a été publiée / a été cliquée / fermée

    //l: false,
    // définir un langage fixe pour le message, ex. "fr". Cela remplace la détection par défaut.

    //test: false,
    // true = affiche toujours la barre (pour les tests)

    //text: '',
    // personnaliser la notification (html)
    // La balise {brow_name} sera remplacée par le nom du navigateur, {up_but} par le contenu du lien de mise à jour et {ignore_but} par le contenu du lien « Ignorer ».
    // Exemple : Votre navigateur, {brow_name}, est trop ancien : <a{up_but}>Mettre à jour</a> or <a{ignore_but}>Ignorer</a>.

    //text_xx: '',
    // texte de notification personnalisé pour la langue "xx"
    // ex. Text_de pour allemand et text_it pour italien

    //newwindow: true,
    // ouvre le lien dans un nouvel onglet/fenêtre

    //url: null,
    // L'URL à consulter après avoir cliqué sur la notification

    //noclose: false,
    // Ne pas afficher le bouton « Ignorer » pour fermer la notification

    //nomessage: false,
    // Ne ne pas afficher un message si le navigateur est obsolète, appeler simplement la fonction de callback « onshow »

    //jsshowurl: '//browser-update.org/update.show.min.js',
    // URL where the script, that shows the notification, is located. This is only loaded if the user actually has an outdated browser.

    //container: document.body,
    // DOM Element where the notification will be injected.

    style: 'bottom',
    // The position where the notification should be shown. Available options are:"top", "bottom", "corner"

    api: 5,
    // La version de l'api browser-update à utiliser. Merci de ne pas retirer.

    insecure: true

};


function $buo_f(){
 const s = document.createElement('script');
 s.src = '//browser-update.org/update.min.js';
 s.async = true;
 s.setAttribute('data-timestamp', +new Date());
 document.body.appendChild(s);
};
try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
catch(e){window.attachEvent("onload", $buo_f)}

{% endraw %}
