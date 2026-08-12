import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { TaskItem } from '../../types';

interface TasksTabProps {
  tasks: TaskItem[];
  onAddTask: (task: TaskItem) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Bisnis' | 'Pribadi' | 'Belanja' | 'Keuangan'>('Bisnis');
  const [newPriority, setNewPriority] = useState<'tinggi' | 'sedang' | 'rendah'>('tinggi');

  const handleCreate = () => {
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      dueDate: 'Hari ini',
      completed: false,
      priority: newPriority,
    };

    onAddTask(newTask);
    setNewTitle('');
  };

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 p-3.5 rounded-2xl border border-purple-500/30 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold bg-slate-950 text-purple-300 px-2 py-0.5 rounded-full">
            Pengatur Aktivitas Toko
          </span>
          <h2 className="text-sm font-extrabold text-white mt-1">Daftar Tugas & Pengingat</h2>
          <p className="text-[10px] text-purple-200">Catat tugas bisnis, pembayaran, dan pemesanan barang.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-950/30 text-purple-300 flex items-center justify-center">
          <CheckSquare className="w-6 h-6" />
        </div>
      </div>

      {/* Add New Task Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
        <h3 className="text-xs font-bold text-slate-300">Tambah Catatan Tugas Baru</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Tuliskan judul tugas / reminder..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-2 py-1 flex-1 focus:outline-none"
            >
              <option value="Bisnis">Kategori: Bisnis</option>
              <option value="Keuangan">Kategori: Keuangan</option>
              <option value="Belanja">Kategori: Belanja</option>
              <option value="Pribadi">Kategori: Pribadi</option>
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-2 py-1 flex-1 focus:outline-none"
            >
              <option value="tinggi">Prioritas: Tinggi</option>
              <option value="sedang">Prioritas: Sedang</option>
              <option value="rendah">Prioritas: Rendah</option>
            </select>

            <button
              onClick={handleCreate}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
        <h3 className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
          Semua Tugas ({tasks.length})
        </h3>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-2.5 rounded-xl border transition-colors flex items-center justify-between gap-2 text-xs ${
                task.completed
                  ? 'bg-slate-950/50 border-slate-800/50 opacity-60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                />
                <div>
                  <h4
                    className={`font-semibold text-[11px] ${
                      task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] bg-slate-800 text-purple-300 px-1.5 py-0.2 rounded font-medium">
                      {task.category}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold capitalize ${
                        task.priority === 'tinggi'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
