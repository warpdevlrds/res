'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

interface PDFExportProps {
  title: string;
  data: any;
  type: 'workout' | 'progress' | 'report';
}

export default function PDFExport({ title, data, type }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Importar jsPDF dinamicamente
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      // T?tulo
      doc.setFontSize(18);
      doc.text(title, 14, 20);
      
      // Conte?do baseado no tipo
      if (type === 'workout') {
        doc.setFontSize(12);
        let yPos = 30;
        doc.text(`Treino: ${data.name || 'Sem nome'}`, 14, yPos);
        yPos += 10;
        doc.text(`Aluno: ${data.studentName || 'N/A'}`, 14, yPos);
        yPos += 10;
        doc.text(`Data: ${data.date || new Date().toLocaleDateString()}`, 14, yPos);
        yPos += 15;
        
        doc.text('Exerc?cios:', 14, yPos);
        yPos += 10;
        
        data.exercises?.forEach((exercise: any, index: number) => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(10);
          doc.text(
            `${index + 1}. ${exercise.name || exercise.exerciseId} - ${exercise.sets} s?ries ? ${exercise.reps} reps`,
            14,
            yPos
          );
          yPos += 7;
        });
      } else if (type === 'progress') {
        doc.setFontSize(12);
        let yPos = 30;
        doc.text(`Relat?rio de Progresso`, 14, yPos);
        yPos += 10;
        doc.text(`Aluno: ${data.studentName || 'N/A'}`, 14, yPos);
        yPos += 10;
        doc.text(`Per?odo: ${data.period || 'N/A'}`, 14, yPos);
        yPos += 15;
        
        if (data.metrics) {
          doc.text('M?tricas:', 14, yPos);
          yPos += 10;
          Object.entries(data.metrics).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 14, yPos);
            yPos += 7;
          });
        }
      } else if (type === 'report') {
        doc.setFontSize(12);
        let yPos = 30;
        Object.entries(data).forEach(([key, value]) => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(`${key}: ${String(value)}`, 14, yPos);
          yPos += 10;
        });
      }
      
      // Salvar PDF
      doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, instale jsPDF: npm install jspdf');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Gerando...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>Exportar PDF</span>
        </>
      )}
    </button>
  );
}
