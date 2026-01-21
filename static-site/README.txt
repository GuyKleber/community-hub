PHILOMATH COMMUNITY CHURCH - STATIC WEBSITE
===========================================

This is a plain HTML/CSS website with no React or build step required.

DEPLOYMENT INSTRUCTIONS FOR HOSTINGER:
--------------------------------------

1. Download this entire "static-site" folder

2. IMPORTANT: Copy your church images to the "images" folder:
   - Copy "church-hero.png" from src/assets/ to static-site/images/
   - Copy "church-building.png" from src/assets/ to static-site/images/

3. Upload ALL contents of this folder to your Hostinger public_html directory:
   - css/styles.css
   - images/church-hero.png
   - images/church-building.png
   - index.html
   - about.html
   - beliefs.html
   - missions.html
   - purpose.html
   - history.html
   - calendar.html

4. Your site should now be live at your Hostinger domain!


FILE STRUCTURE:
---------------
static-site/
├── css/
│   └── styles.css        (All styling)
├── images/
│   ├── church-hero.png   (Header banner image - YOU MUST ADD THIS)
│   └── church-building.png (Church building photo - YOU MUST ADD THIS)
├── index.html            (Home page)
├── about.html            (About page)
├── beliefs.html          (Beliefs page)
├── missions.html         (Missions page)
├── purpose.html          (Our Purpose page)
├── history.html          (History page)
├── calendar.html         (Calendar page with Google Calendar embed)
└── README.txt            (This file)


MAKING CHANGES:
---------------
- To edit content: Open any .html file in a text editor and modify the text
- To change colors/fonts: Edit css/styles.css
- To add new pages: Copy any existing .html file and update the content

No build tools, npm, or technical knowledge required!
