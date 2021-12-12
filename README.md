# wander-app

* Shake your phone as a wand to draw and cast Harry Potter spells and win wands.

## Bugs
Unfortunately, with the final feature we develop our server limit of 50MB for source code was finished (our source code built became 51MB)
So, we tried to deploy it to aws server in the last minute and it took some time. As a result we couldn't test this feature. 
There are tiny typo bugs regarding this feature, and can be fixed by applying patch from [wander-app-after-hackathon.patch](https://gist.github.com/okaygenc/82e629f1923bf274b38edc54c92dcc33) to this repo. 
They will be committed to this repo after the hackathon evaluations end. 
* To do so, download [wander-app-after-hackathon.patch](https://gist.github.com/okaygenc/82e629f1923bf274b38edc54c92dcc33) to repo main folder
* Type `git apply wander-app-after-hackathon.patch`
* Now, the repo should be patched correctly.
* Patch files are git diff results obtained by `git diff` You can google it to get to know it more.

Another version (AWS one) including this patch is deployed on [https://api2.wanderapp.cf/docs](https://api2.wanderapp.cf/docs) with the new feature working as well.

## Wander Repositories
* [@corupta/wander-app](https://github.com/corupta/wander-app)
* [@corupta/wander-api](https://github.com/corupta/wander-api)
* [@corupta/wander-test-dashboard](https://github.com/corupta/wander-test-dashboard)
## Swagger Docs
[https://api.wanderapp.cf/docs](https://api.wanderapp.cf/docs)

## VIDEO
[VIDEO](https://wanderapp-assets.s3.amazonaws.com/gorseller/RPReplay_Final1639340791.MP4)

## YOU DON'T NEED TO START BACKEND ON YOUR LOCAL MACHINE. You just need to run the application on your phone with expo. 

## App Start
* STEP 1
* yarn global add expo-cli
* STEP 2
* cd wander-app
* STEP 3
* yarn
* STEP 4
* yarn start


![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/1.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/2.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/3.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/4.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/5.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/6.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/7.png)
![image](https://wanderapp-assets.s3.amazonaws.com/gorseller/8.png)
