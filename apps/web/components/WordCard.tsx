interface Word {
  id: string;
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation?: string;
  audio_url?: string;
}

interface WordCardProps {
  word: Word;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tai Khamyang */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Tai Khamyang
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {word.tai_khamyang_word}
          </div>
        </div>

        {/* English */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            English
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {word.english_word}
          </div>
        </div>

        {/* Assamese */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Assamese
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {word.assamese_word}
          </div>
        </div>
      </div>

      {/* Pronunciation */}
      {word.pronunciation && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Pronunciation: <span className="font-medium">{word.pronunciation}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
