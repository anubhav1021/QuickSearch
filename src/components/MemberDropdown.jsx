import { Users } from "lucide-react";

function MemberDropdown({
  members,
  selected,
  onChange,
}) {
  return (
    <div className="flex items-center gap-3 w-full bg-white border border-slate-300 rounded-xl px-4 h-12 shadow-sm">

      <Users
        size={20}
        className="text-slate-500 flex-shrink-0"
      />

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none border-none text-slate-700 font-medium"
      >
        {members.map((member) => (
          <option
            key={member.id}
            value={member.name}
          >
            {member.name}
          </option>
        ))}
      </select>

    </div>
  );
}

export default MemberDropdown;