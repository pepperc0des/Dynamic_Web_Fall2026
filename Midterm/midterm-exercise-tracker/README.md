# Lift Log

A workout list where you add the exercises you need to do for today's session, each with
the weight you lifted last time, then tick them off as you go.

**Who it's for:** As someone who lifts a few times a week and haven't been as consistent as before, I can never remember
what weight I did last session.

## User story

> As someone who lifts a few times a week, I want to record the weight
> I used for each exercise, so that I know what to do for the next
> session and also helps me keep track of how I'm doing in terms of how much
> weight I can lift.

**The field it produced:** `weight`, a **number** input in pounds.

- It's a number input because the story is about a number you keep track of
- A blank box means **bodyweight** (push-ups, pull-ups, plank). It's saved as
  `null`, not `0`, because "I lifted 0 lb" and "this exercise has no weight" are
  different things.
- It shows in the list on every row as "135 lb", or "Bodyweight".
- It can be set when you add an exercise **and** changed later in the edit form,
  because the weight goes up over time. That's the whole point of the story.

## How to run it

You need two terminals, both in this folder.

```bash
npm install        # first time only (installs React, Vite, axios, json-server)
npm run server     # terminal 1: the fake API on http://localhost:3001
npm run dev        # terminal 2: the app on http://localhost:5173
```

If you see "Could not reach the server. Is `npm run server` running?", the
first terminal isn't running.

## Props or Context, and why

I used **Context** for the list of exercises and the functions that change it
(`createTodo`, `editTodoById`, `deleteTodoById`, `toggleTodoById`), because
four components need them: `App`, `TodoCreate`, `TodoList` and `TodoItem`.
Without Context, `App` would have to hand the same functions down through
`TodoList` to `TodoItem`, and `TodoList` doesn't use them at all. It would only
be passing them along. Not everything went into Context, though. What you're
halfway through typing (one `form` object with `title` and `weight`), the
validation message and `isSubmitting` live in each form, and whether a
row is showing its edit form (`showEdit`) lives in that one `TodoItem`, because
no other component cares. `TodoEdit` gets **props** (`todo`, `onSubmit`,
`onCancel`) because it only ever has one parent, the row it belongs to.

## Developer checklist (before I wrote any code)

1. Add a number input to `TodoCreate` with `value` and `onChange`.
2. Add `weight` to the POST body in `api.js`.
3. Pass `weight` through `createTodo` in the Context.
4. Show the weight in `TodoItem`.
5. Add some weights to `db.json` to test with.

## Revised checklist

1. Fix the build first: `ToDoList.jsx` imported `"TodoItem"` instead of
   `"./ToDoItem"`, and `axios` wasn't in `package.json`.
2. Add a number input to `TodoCreate`, controlled with `value` / `onChange`.
   Keep it as a **string** in state, because inputs always give you strings.
3. Write `toWeight()` in `src/weight.js`: `""` becomes `null`, anything else
   becomes `Number(...)`.
4. Add `weight` to the POST body in `api.js` and to `createTodo` in the
   Context.
5. **Add the weight input to `TodoEdit` too**, starting at the current value.
6. **Add `weight` to the PUT in `editTodoById`.** PUT replaces the whole
   record, so leaving it out would delete the weight whenever you renamed an
   exercise.
7. **Handle old rows that have no `weight` key at all.** `toInputValue()`
   turns `undefined` / `null` into an empty box, and `formatWeight()` shows
   "Bodyweight".
8. Show the weight in `TodoItem`, with different styling for "has a weight" and
   "bodyweight".
9. Stop Vite reloading the page every time json-server saved `db.json`
   (`server.watch.ignored` in `vite.config.js`). It was wiping whatever I'd
   typed.
10. Add `w-full min-w-0` to the inputs so they stop overflowing their cards at
    phone width.
11. Put the add, edit, delete and toggle calls in `try/catch`, so a failed save
    shows an error on screen instead of only in the console.
12. Switch each form to **one state object** (`{ title, weight }`) with one
    `handleChange`, give every input a `name` that matches its key, and link
    every `label` to its input with `htmlFor` / `id`. Edit rows need unique ids
    (`edit-title-${todo.id}`).
13. **Validation:** an empty name doesn't save, and a message _in words_ appears
    under the field (not just a red border).
14. **Don't clear the form until the save worked.** `createTodo` and
    `editTodoById` now return `true` / `false`, the create form only clears on
    `true`, and the edit form only closes on `true`. Tested by stopping
    json-server and submitting: the typing stays.
15. `disabled={isSubmitting}` on Add and Save, so a double-tap in the demo can't
    save two copies.
16. Phone fixes: inputs at 16px so iPhone doesn't zoom in when you tap one, and
    bigger tap areas on the checkbox, Edit and Delete.

## The gap

My first list had 5 steps and the real one had 16. What I forgot:

- **The edit form.** I only planned for creating, but the story is about the
  weight _changing_, so editing it matters most.
- **PUT replaces the whole record.** Without `weight` in the PUT, renaming
  "Bench press" would have silently wiped its weight.
- **Old rows in `db.json` don't have the field.** `undefined` needed to show
  as "Bodyweight", not "undefined lb".
- **Empty isn't zero.** `Number("")` is `0`, so a blank box would have saved
  "0 lb" for push-ups if I hadn't checked for `""` first.
- **The form is more than an input.** Labels, `name`, validation, and not
  clearing the form when the save fails were all missing from my plan. I only
  thought about the happy path.
- Things that weren't about the field at all: the broken import, the page
  reloading on every save, and inputs overflowing on a phone.

## With another week

- **Sort or filter by weight**, or show the heaviest lifts first. That's the
  natural payoff of the story.
- **Sets and reps** as a second field, since weight alone isn't the whole
  workout.
- **History**, so I can see the weight climbing over time and not just the
  latest number.
