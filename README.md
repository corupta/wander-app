# wander-app

* Shake your phone as a wand to draw and cast Harry Potter spells and win wands.
* # How it Works

Our aim is to provide an experience where you master Harry Potter spells through practicing to draw them with your mobile phones. However, we did not take a simple approach, and instead made it possible through moving/rotating your phones, rather than drawing by hand.

The idea is that we could use Gyroscope, Accelerometer and Magnetometer sensors inside mobile phones to detect rotation, displacement, etc. of the phone. Using these data, we could create estimated drawings on a 2D plane. Finally, that drawing can be matched with original spell shape to decide whether you have successfully cast the spell!

It required a huge R&D effort for us; however, we have managed to accomplish them all. Let me explain how it works for you!

### Different Types of Sensor Data
* Firstly, we have collected all available sensor data from our mobile devices, and plotted them on real-time scatter plots. Next up, we have taken first and second derivative as well as first and second degree integral of these data, and also plotted these in these scatter plots. 
	* To reproduce, use [@corupta/wander-test-dashboard](https://github.com/corupta/wander-test-dashboard) in combination with an old version of mobile app dedicated to this testing process [@corupta/wander-app sensor-test branch](https://github.com/corupta/wander-app/tree/sensor-test)
	* After running the dashboard (which opens up a socket.io server to collect data from mobile) in combination with that mobile version, you can do below:
	* Within this dashboard, if you go to 2d page, you can see all data plotted in real-time.
	* Again, in the dashboard you can go to 3d pages to see how some selected data is plotted in 3d. 
	* Finally, if you go to 3dgl page, you can see a 3d to 2d mapped plot. It works, stable enough in my opinion, I COULD LITERALLY WRITE MY NAME USING MY PHONE AS A LASER POINTER.

### How to get 2D plots?
* The idea is if you use x and z values of gyroscope data and take its double integral, this is a good estimation of the relative movement of your phone which can be used as a laser pointer prediction.
* However, the data is super noisy, and integrals diverge to infinity as a result.
* We found a very interesting way to fix that issue. Think of the nuclear physics where particles have half-decay time. We applied a similar idea such that we always multiplied values with a decay ratio. If we keep this value high enough, everything worked super smoothly in an unexpected way. But that was not the only parameter we tried, and we weren't sure if this was possible at the beginning of the hackathon.
* Doing above, we get a list of points in 2d, which can be used to create successful 2d drawings

### Image Similarity
* We then compared two images (original spell shape image) by taking some kind of hashes via `Jimp` and obtained a similarity metric.

### The Game
* Login with GitHub OAuth
* When you successfully cast your next spell, you level up
* As you level up, you can equip new wands.
* See leaderboard and other players.

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
