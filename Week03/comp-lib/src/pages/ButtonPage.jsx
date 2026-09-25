import Button from "../components/Button";
import { GoBell, GoTrash } from "react-icons/go";

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-3">
        <Button primary onClick={() => console.log("Primary button clicked!")}>
          <GoBell />
          Primary
        </Button>
      </div>
      <div div className="mb-3">
        <Button secondary className="mt-8">
          Secondary
        </Button>
      </div>
      <div className="mb-3">
        <Button success>Success</Button>
      </div>
      <div className="mb-3">
        <Button danger>Danger</Button>
      </div>
      <div className="mb-3">
        <Button warning>Warning</Button>
      </div>
      <div className="mb-3">
        <Button danger outline>
          <GoTrash />
          Danger Outline
        </Button>
      </div>
      <div className="mb-3">
        <Button success rounded>
          Success Rounded
        </Button>
      </div>
      <div className="mb-3">
        <Button primary outline rounded>
          Primary Outline Rounded
        </Button>
      </div>
      {/* only one color variant can be true at a time let's make a 
      function to warn other dev if they accidentally do */}
      <div className="mb-3">
        <Button secondary rounded>
          Secondary Rounded
        </Button>
      </div>
      {/* <button className="px-8 py-3 bg-blue-500 border-blue-500 text-white">
        Click Me
      </button> */}
    </>
  );
};

export default ButtonPage;
