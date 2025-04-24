import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { contentCategories } from "./ContentLibrary";

interface CodeInfoCardProps {
  code: string;
  title: string;
  description: string;
  category: string;
  type: string;
}

const CodeInfoCard = ({ code, title, description, category, type }: CodeInfoCardProps) => {
  // Find category for styling
  const categoryInfo = contentCategories.find(c => c.id === category) || {
    name: 'Неизвестно',
    color: 'bg-gray-600'
  };

  // Generate a color class based on the category
  const getCategoryColorClass = () => {
    const categoryObj = contentCategories.find(cat => cat.id === category);
    return categoryObj?.color || 'bg-slate-600';
  };

  // Category badge style
  const badgeClass = `${getCategoryColorClass()} hover:${getCategoryColorClass()}/80`;

  return (
    <Card className="border border-slate-700 bg-slate-900 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-blue-400 font-mono">{title}</CardTitle>
          <Badge className={badgeClass}>
            {categoryInfo.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-slate-300 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Тип: {type}</span>
          <span className="text-slate-500">Код: {code}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeInfoCard;
