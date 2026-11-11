Fall 2026 Dynamic Web Application Class

## Week 10: State plan for my final project

My final project idea is a clicker/idle game: you click to earn points, spend them on upgrades in a shop, and the upgrades earn points for you every second. Almost all of its state is local to one component, so it lives in `useState`. Points and upgrades are shared by only a few components one level below `App`, so I pass them down as props. The sound setting is the only thing read across the whole app, so it goes in Context. I don't need Redux, because the app is small, there is only one place that changes the score, and nothing is deeply nested.

| State                              | Where it lives                       | Why                                                                                 |
| ---------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| Current points                     | `useState` in `App`, passed as props | Header, click button and shop all need it, but they're all direct children of `App` |
| Upgrades owned (count per upgrade) | `useState` in `App`, passed as props | The shop changes it, and `App`'s once-a-second timer reads it                       |
| Which shop tab is open             | `useState` in `Shop`                 | Only the shop cares                                                                 |
| Floating "+1" click effects        | `useState` in `ClickButton`          | Short-lived and only shown on the button                                            |
| Settings panel open/closed         | `useState` in `Header`               | Only the header shows or hides it                                                   |
| Sound on/off                       | Context                              | Read by many components that play sounds, at different depths                       |
| Points per second                  | Not state                            | Calculated from the upgrades owned on every render                                  |
| Upgrade list (names, costs)        | Not state                            | Never changes, so it's a plain module export                                        |
