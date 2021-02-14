# Assignment — D3 Basic Charts

This repository is your starting point for the assignment and includes the instructions below.

Link to your GitHub pages website: `[insert your *clickable* hyperlink here]`

# Aim of the assignment

D3 is a valuable JavaScript library you can use to create custom data visualizations or to bind elements of the DOM to data in general.
This assignment will help you learn the basics of D3 by creating two custom charts: a bar chart and a line chart.

# Instructions
Please look through **all** the materials below so you understand the setup instructions; how to run, organize, and submit your code; and our requirements for the visualization.

## Setup

**Under no circumstances should you be editing files via the GitHub website user interface.** Do all your edits locally after cloning the repository. Commit major versions to your git repository.

1. Clone this repository to your local machine.
    E.g., in your terminal / command prompt `CD` to where you want this the folder for this activity to be. Then run `git clone <YOUR_REPO_URL>`

1. `CD` or open a terminal / command prompt window into the cloned folder.

1. Start a simple python webserver. E.g., `python -m http.server`, `python3 -m http.server`, or `py -m http.server`. If you are using python 2 you will need to use `python -m SimpleHTTPServer` instead, but please switch to python 3 as [Python 2 was sunset on 2020-01-01](https://www.python.org/doc/sunset-python-2/).

1. Wait for the output: `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)`.

1. Now open your web browser (Firefox or Chrome) and navigate to the URL: http://localhost:8000

## Update hyperlinks

1. Edit near the top of this `README.md` file to include a clickable hyperlink to the GitHub pages website for your repo., replacing the `` `[insert your *clickable* hyperlink here]` `` code with your markdown. (Detailed instructions for GitHub pages [here](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Using_Github_pages).)

1. In `index.html` update the GitHub repo URL with the URL of your repository. It is in the span with `id='forkongithub'`.

## Organization

Here is an overview of the files and folders we provide for you in your repo.

### Root Files
* `README.md` is this explanatory file for the repo.

* `index.html` contains the main website content.

* `style.css` contains the CSS.

* `LICENCE` is the source code license for the template. You can add your name or leave it as is.

### Folders
Each folder has an explanatory `README.md` file.

* `data` will hold the data file for the visualization.

* `favicons` contains the favicons for the web page. You shouldn't change anything here.

* `img` contains a descriptive image for the `README.md`.

* `.github` contains [GitHub Actions](https://github.com/features/actions) ([docs](https://docs.github.com/en/actions)) which will automatically validate your HTML, CSS, and hyperlinks when you push (see the [**Validated** requirement below](#validated)). **Do not edit files here** except to create new `.yml` files for any additional actions you choose to add (you are not required to make any).

* `js` will contain all JavaScript files you write. E.g.,

  * `main.js` is the js code that you will have to fill in.

* `lib` will contain any JavaScript library you use. It currently includes D3. To ensure long-term survivability, **use the included D3 here rather than linking to [d3js.org](https://d3js.org) or some other CDN.** Likewise, put your other libraries here rather than loading them from elsewhere.

## Visualization and web page requirements

You must implement the web page following these requirements:

**Type**: ​One of the two visualizations you create has to be a bar chart, and the other has to be a line chart.

**Data**: ​In this assignment we give you the chance to find and select your own data. It can be related to your research, a subject of interest, a hobby, etc. **Please submit a copy of the raw data in your repository in the `data` folder.**

**Color**: ​Both plots must include color as a channel to encode some data. E.g., using [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

**Interaction**: ​The expectation is that these plots are static except for the following requirement: at minimum one of your two plots should have a "details on demand" interaction, i.e., mouseover or click on bar/line to retrieve and display value.

**Overall excellence**: Make sure your plots follow the design guidelines and rules of thumb discussed in the reading as well as lecture. 

**Code comments**: Please make sure to add copious comments to your code to demonstrate your understanding of how your code works. Points will be deducted for little or no comments. 

**Descriptive prose**: Please include on your web page answers to the following questions for ​each visualization (a few sentences for each is sufficient):

1. Explain the dataset you choose to use and why you chose it.
*Make sure to include a clickable hyperlink to the original data source and include a copy of the data with your submission.*
1. State for each visualization what types of data you used (categorical, ordinal, quantitative).
1. Justify your encoding (i.e., bar, line, pie) type for the data you visualize and why it is appropriate. The encodings should make sense and follow the guidelines discussed in the reading as well as lecture.

<a name='validated'></a>**Validated**: Ensure your code passes the 'Validate HTML, CSS, and Links' checks we run when you push to GitHub. I.e., you want to see a green check next to your commit
  (<svg width='16' height='16' role='img'><path stroke='#22863a' d='M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z'></path></svg>)
  and not a red X
  (<svg width='16' height='16' role='img'><path stroke='#cb2431' d='M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z'></path></svg>).
You can also see the results in the Actions tab of your repo:
![GitHub Actions tab](img/gh-actions.png)

# Academic integrity
You are welcome to use D3 tutorials or resources as a starting point for your code.
However, **you must cite and reference the resources or sample code you use and explain how you use them**.
***This includes anything from [bl.ocks.org](https://bl.ocks.org/), [Observable](https://observablehq.com/@d3/gallery), or [Stack Overflow](https://stackoverflow.com/)!***
Failure to properly cite and attribute code is a breach of academic honesty.
Also, per our syllabus, homework is an individual assessment and should be completed by you alone.
Simply copying existing examples without performing thoughtful edits is a breach of academic honesty.
You are welcome to ask fellow classmates and students for help and discuss the assignment, but **the submission should be your own work**.
***See [the syllabus](https://northeastern.instructure.com/courses/63405#Academic_Integrity_Policy) for much more detail on our academic integrity policy and expectations.***

# Submission instructions

1. Ensure you updated (1) the GitHub Pages URL at the top of this `README.md` file and (2) the GitHub repository URL in `index.html` in the span with `id='forkongithub'`.

1. Commit all your local files and push them to the remote repository on GitHub which was generated by GitHub Classroom. We will grade based on what is visible on the GitHub Page.

1. Make sure your data is included in the repository on GitHub in the `data` folder.

1. Ensure all visualizations and prose required above are present in your GitHub page.

1. Submit the URL of **your GitHub Classroom-generated repository** (not your GitHub Page) to [the associated assignment on Canvas](https://northeastern.instructure.com/courses/63405/assignments/874477). **Do not submit a link to a personal repository. It must be within our class GitHub organization.**

# Tips, tricks, and troubleshooting

See https://github.com/NEU-CS-7250-S21-Staff/General_Course_Information/blob/master/altair.md

# Assignment setup (for instructors only)

See https://github.com/NEU-CS-7250-S21-Staff/General_Course_Information/blob/master/assignment-setup.md
