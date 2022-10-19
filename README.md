
# Collaborative Web Sequencer

Our app offers an opportunity for users to play together at the same time on one platform.
Send it to your friends and you can play together and create melodies with a click of a button.




## Demo
Working live demo


https://collab-web-seq.herokuapp.com/
(Please use Google Chrome to check it, it's malfunctioning on Safari and can't figure out why yet, sorry)



## Authors

- [@EricChukoltynsky](https://github.com/EricChukoltyansky)
- [@IdanLev](https://github.com/idan93l)


## Acknowledgements

 - [Sending sounds through socket.io](https://www.youtube.com/watch?v=sQTFXa_tarw)
 - [Create chat through socket.io](https://www.youtube.com/watch?v=NU-HfZY3ATQ)



## Documentation

[tonejs](https://tonejs.github.io/)
[socket.io](https://socket.io/)
[styled-components](https://styled-components.com/)




## Deployment

To deploy this project run

```bash
  npm run dev
```


## FAQ

#### What each line represents?

Each line represents different sound, which in it turn acts according to the beat declared.

#### How are the sounds ordered?

Top to Bottom: 
- 5 melodic(F#, E, C#, A, F#)
- 4 bass(F#, E, C#, B,)
- 4 rhythm(open-hat, closed-hat, snare, kick)

#### Are you planning on adding new features in the future?

Yes! new and cool features are currently in the work, we are looking forward preseting it soon.





## Features

- Increase/decrease BPM
- Increase/decrease volume
- Play/pause button
- Stop button
- Clear all button
- Turn on/off sounds
- Mobile friendly
- Real-time multiple users interaction
- Original audio segments, made with Ableton live 11.1

## Feedback

If you have any feedback, please reach out to us at erik.chukoltyansky@gmail.com or idan.93lev@gmail.com


## Lessons Learned

- Sounds transfer via web socket technology to multiple users
- Styled-components functionality
- Tonejs audio management system
- Collaborative work with git
- Time management within a group environment
- How to enjoy the process of coding when focusing on a passionable subject 


## Tech Stack

**Client:** React, Styled-Components, Vanilla JS, CSS, HTML, responsive design

**Server:** Node, Socket.io

