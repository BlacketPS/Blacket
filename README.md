<div id="top"></div>
<br />
<div align="center">
  <a href="https://blacket.org">
    <img src="https://blacket.org/content/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Blacket</h3>

  <p align="center">
    The first ever open-source Blooket private server created by Xotic written entirely in NodeJS. 
    <br />
    <a href="https://github.com/XOTlC/Blacket/wiki"><strong>Get Help</strong></a>
    <br />
    <a href="https://github.com/XOTlC/Blacket/issues">Report Bug</a>
    <a href="https://github.com/XOTlC/Blacket/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
    <ul>
      <li><a href="#admin-panel">Admin Panel</a></li>
      <li><a href="#default-values">Default Values</a></li>
      <li><a href="#creating-boxes">Creating Boxes</a></li>
      <li><a href="#creating-blooks">Creating Blooks</a></li>
      <li><a href="#creating-news">Creating News</a></li>
    </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project
<img src="https://blacket.org/content/github/blacketHome.png"></img>
Me personally, I love Blooket and everything about it, but I felt something was missing. A lot of people have made Blooket cheat scripts / hacks but has never ever created anything completely for Blooket itself. So thats why I created Blacket, the first open-source Blooket private server. I always wanted to have the ability to have custom packs, blooks, and more but I can't since I am not Ben Stewart (the creator of Blooket) so I have decided to create this.
<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Having any debian server should be good for Blacket. If you don't know where to start, I would recommend <a href="https://linode.com">Linode</a> for beginners.

### Prerequisites

The following packages need to be installed before starting:

* NodeJS

  ```sh
  cd ~
  curl -sL https://deb.nodesource.com/setup_17.x -o /tmp/nodesource_setup.sh
  sudo bash /tmp/nodesource_setup.sh
  sudo apt install nodejs
  ```

* MySQL

  ```sh
  sudo apt update
  sudo apt-get install mysql-server
  ```
  _Follow the instructions for all of the packages that will show on screen._
  
### Installation

1. Clone the repo into your home folder:

   ```sh
   cd /temp
   git clone https://github.com/XOTlC/Blacket.git
   sudo mv -v /temp/Blacket-master ~/blacket
   ```
2. Configure Blacket for the database:

   ```sh
   sudo visudo ~/blacket/config.js
   ```
   <img src="https://blacket.org/content/github/configDatabase.png"></img>
   </br>
   _Change host to the host of the MySQL database (should be localhost by default)._
   </br>
   _Change user to the username you configured in the MySQL setup process (should be root by default)._
   </br>
   _Change password to the password you configured in the MySQL setup process._
   </br>
   _Change database to the name of the database you want to use._
   </br>
   _Leave `multipleStatements` on true._
   </br>
   
3. Setup the database:
   * Visit the IP of the server your Blacket instance is running on and go through the setup process.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

### Admin Panel

If you have done everything right so far, you should be able to access the homepage of your Blacket instance. To access the admin panel, login to the account you granted admin with and click the admin button in the top right corner.

<img src="https://blacket.org/images/github/adminPanelButton.png"></img>

Once you have clicked the button, you should meet a similar looking page:

<img src="https://blacket.org/images/github/adminPanel.png"></img>

### Default Values

To change the default values such as the daily token limit, click Default Values on the admin panel.

<img src="https://blacket.org/images/github/defaultValuesButton.png"></img>

From here, you can edit default values that are set in Blacket that will update globally.

<img src="https://blacket.org/images/github/defaultValues.png"></img>

### Creating Boxes

To create a box, click the Box Editor button on the admin panel.

<img src="https://blacket.org/images/github/boxEditorButton.png"></img>

All boxes must follow the format shown below to work:

<img src="https://blacket.org/images/createBoxHelp.png"></img>

From here, you can edit boxes and create boxes easiely.

<img src="https://blacket.org/images/github/boxEditor.png"></img>

### Creating Blooks

To create a blook, click the Blook Editor on the admin panel.

<img src="https://blacket.org/images/github/blookEditorButton.png"></img>

From here, you can change any blook and create blooks easiely.

<img src="https://blacket.org/images/github/blookEditor.png"></img>

### Creating News

To add news to your server, click the News Editor on the admin panel.

<img src="https://blacket.org/images/github/newsEditorButton.png"></img>

From here, you can create news and delete news from your server.

<img src="https://blacket.org/images/github/newsEditor.png"></img>

_For more examples, please refer to the [Documentation](https://github.com/XOTlC/Blacket/wiki)_

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
