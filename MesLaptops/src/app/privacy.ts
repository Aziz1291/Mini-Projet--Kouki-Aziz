import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ standalone: true, imports: [RouterLink], template: `
<main class="notice-shell"><article class="notice-card">
<p class="notice-kicker">LAPTOPSTORE · DÉMONSTRATION</p><h1>Confidentialité et stockage</h1>
<p>Cette application est un projet de démonstration d’Aziz Kouki. Contact : <a href="mailto:aziz@azizkouki.com">aziz&#64;azizkouki.com</a>.</p>
<h2>Données utilisées</h2><p>Lors de l’inscription, l’application reçoit un nom d’utilisateur, une adresse e-mail et un mot de passe. Le serveur enregistre le mot de passe sous forme de condensat et utilise l’adresse pour envoyer un code de vérification. Les données du compte et son état sont enregistrés dans la base de données. Les informations de connexion servent à vous authentifier et à gérer les accès.</p>
<p>Le catalogue et les modifications que les utilisateurs autorisés y apportent sont transmis au service de l’application et enregistrés dans sa base de données. Ne saisissez pas d’informations sensibles dans cette démonstration.</p>
<h2>Stockage du navigateur</h2><p>Après connexion, un jeton d’authentification est enregistré dans le stockage local sous la clé <code>jwt</code> jusqu’à la déconnexion ou sa suppression dans le navigateur. La clé <code>laptopstore_notice</code> est enregistrée dans le stockage de session pour mémoriser que vous avez pris connaissance de cet avis ; elle disparaît à la fin de la session de l’onglet. Ces éléments servent au fonctionnement de la démonstration.</p>
<p>Le code examiné ne met pas en place de cookies publicitaires ou de mesure d’audience. Les services d’hébergement et de messagerie peuvent traiter des données techniques nécessaires à leurs services, comme l’adresse IP ou les journaux de requêtes.</p>
<h2>Hébergement, conservation et demandes</h2><p>L’interface et les services communiquent avec les services hébergés du projet ; un service de messagerie transmet le code de vérification. Aucune durée de suppression automatique des comptes n’est définie dans le code examiné. Pour demander l’accès, la correction ou la suppression de vos données, contactez l’adresse ci-dessus. Vous pouvez également supprimer le stockage de cette application dans les paramètres de votre navigateur.</p>
<p><a routerLink="/login">Retour à la démonstration</a></p></article></main>` })
export class Privacy {}
