import TuitionCard from "@/components/tuition/TuitionCard";

export default function TuitionGrid({ tuitions }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
            ))}

        </div>
    );
}