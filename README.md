<div id="top"></div>
<br />
<div align="center">
  <a href="https://blacket.org">
    <img src="./assets/logo.png" alt="Logo" width="160" height="160">
  </a>
  <h3 align="center">Blacket</h3>

  <p align="center">
    The first ever open-source Blooket private server created by Xotic written entirely in JavaScript. 
    <br />
    <a href="https://github.com/XoticLLC/Blacket/wiki"><strong>Get Help</strong></a>
    <br />
    <a href="https://github.com/XoticLLC/Blacket/issues">Report Bug</a>
    <a href="https://github.com/XoticLLC/Blacket/issues">Request Feature</a>
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
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project
<img src="./assets/blacket.png"></img>
I absolutely love Blooket and almost everything about it, but always felt something was missing from it. Some very experienced developers have created Blooket cheats / hacks for the game, but not many have made something for Blooket as a whole. I have always wanted to create my own custom packs, blooks, games, and more. This is why I created Blacket, the first open-source Blooket private server.
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

1. Clone the repository into your home folder:
   ```sh
   cd /temp
   git clone https://github.com/XoticLLC/Blacket.git
   sudo mv -v /temp/Blacket-master ~/blacket
   ```
   
2. Move to the frontend directory:
   ```sh
   cd ~/blacket/frontend
   ```

3. Build the frontend:
   ```sh
   npm run build
   ```

4. Move to the backend directory and run `node index.js`
   ```sh
   cd ../backend
   node index.js
   ```

* Open localhost:3000 in your browser to finish setting up your Blacket instance.

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
