import { useStore } from '../store/store';
import { t } from '../lib/i18n';

export default function Team() {
  const { language } = useStore();

  const team = [
    { name: 'Abdulla Qodirbekov', role: 'Founder & Lead Dev', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { name: 'Aziza Odinayeva', role: 'Backend Engineer', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { name: 'Davron Karimov', role: 'Frontend Developer', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { name: 'Nilufar Raximova', role: 'UI/UX Designer', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Bizning Jamoa
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <div key={member.name} className="card p-6 text-center hover:shadow-lg transition-shadow">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
