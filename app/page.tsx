import NavBar from "../components/NavBar";
import HeadingForm from "@/app/components/HeadingForm/HeadingForm";

export default function Home() {
  return (
    <div className="bg-fabric-light flex flex-col items-center">
      <NavBar />

      <div className="max-w-5xl w-full mt-[60px] flex flex-col items-center">
        <HeadingForm />
        {/*<DayPicker captionLayout="dropdown" defaultMonth={new Date(2024, 6)} />*/}
      </div>
    </div>
  );
}
