---
title: Markdown Extended Features
published: 2024-05-01
description: 'Read more about Markdown features in Fuwari'
image: ''
tags: [Demo, Example, Markdown, Fuwari]
category: 'Examples'
draft: false 
---

## GitHub repository cards
You can add dynamic cards that link to GitHub repositories, on page load, the repository information is pulled from the GitHub API. 

::github{repo="Fabrizz/MMM-OnSpotify"}

::github{repo="Apalahdek/Sigma"}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Card</title>
    <style>
        .card {
            background-color: #212121;
            border-radius: 10px;
            color: white;
            padding: 20px;
            width: 400px;
            font-family: Arial, sans-serif;
        }
        .card .header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .card .header img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
        .card .title {
            font-size: 18px;
            font-weight: bold;
        }
        .card .description {
            margin: 10px 0;
        }
        .card .footer {
            display: flex;
            justify-content: space-between;
        }
        .card .footer .stats {
            display: flex;
            gap: 10px;
        }
        .card .footer .stats div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .card .footer .stats div i {
            width: 16px;
            height: 16px;
            display: block;
            background-size: contain;
        }
        .card .footer .license {
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="card">
    <div class="header">
        <img src="https://telegra.ph/file/4e9fc7519e4d85b743fd7.jpg" alt="User Avatar">
        <div class="title">Fabrizz / MMM-OnSpotify</div>
    </div>
    <div class="description">
        Highly customizable MM2 module that displays what you are listening to in Spotify. Compatible with MMM-LiveLyrics and DynamicTheming.
    </div>

</body>
</html>


Create a GitHub repository card with the code `::github{repo="<owner>/<repo>"}`.

```markdown
::github{repo="saicaca/fuwari"}
```
<div style="width: 100%; min-width: 400px; max-width: 800px;">
<div style="position: relative; width: 100%; overflow: hidden; padding-top: 56.25%;">
<p><iframe style="position: absolute; top: 0; left: 0; right: 0; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/38uzvN-plOg" title="YouTube video player" width="560" height="315" allowfullscreen="allowfullscreen" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></p>
</div>
</div>

## Admonitions

Following types of admonitions are supported: `note` `tip` `important` `warning` `caution`

:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::

:::important
Crucial information necessary for users to succeed.
:::

:::warning
Critical content demanding immediate user attention due to potential risks.
:::

:::caution
Negative potential consequences of an action.
:::

```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display External Website</title>
    <style>
        .iframe-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
        }
        .iframe-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
    </style>
</head>
<body>
    <div class="iframe-container">
        <iframe src="https://client.zyrohost.my.id" title="External Website"></iframe>
    </div>
</body>
</html>

The title of the admonition can be customized.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::

```markdown
:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::
```

> [!TIP]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```
