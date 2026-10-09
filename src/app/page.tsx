'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'sonner';
import {
  Heart,
  Star,
  Settings,
  LogOut,
  Mail,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ModeToggle } from '@/components/mode-toggle';

// Form 검증 스키마
const formSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다'),
  message: z.string().min(5, '메시지는 최소 5글자 이상이어야 합니다'),
});

type FormData = z.infer<typeof formSchema>;

// 샘플 테이블 데이터
const tableData = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    role: '개발자',
    status: 'Active',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    role: '디자이너',
    status: 'Active',
  },
  {
    id: 3,
    name: '박민지',
    email: 'park@example.com',
    role: 'PM',
    status: 'Inactive',
  },
  {
    id: 4,
    name: '정준호',
    email: 'jung@example.com',
    role: '마케터',
    status: 'Active',
  },
];

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    toast.success(`환영합니다, ${data.name}님!`);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Next.js Starter Kit</h1>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 1. 버튼 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">버튼 컴포넌트</h2>
          <div className="flex flex-wrap gap-3">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">테두리 버튼</Button>
            <Button variant="ghost">투명 버튼</Button>
            <Button variant="destructive">삭제 버튼</Button>
            <Button size="sm">작은 버튼</Button>
            <Button size="lg">큰 버튼</Button>
            <Button size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* 2. 배지 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">배지 컴포넌트</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="destructive">위험</Badge>
            <Badge variant="outline">테두리</Badge>
          </div>
        </section>

        {/* 3. 아바타 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">아바타 컴포넌트</h2>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* 4. Dialog 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Dialog 컴포넌트</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Dialog 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>환영합니다!</DialogTitle>
                <DialogDescription>
                  이것은 Modal Dialog 컴포넌트입니다. Radix UI를 기반으로 만들어졌습니다.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  이 컴포넌트는 접근성을 지원하며, ESC 키로 닫을 수 있습니다.
                </p>
                <Button onClick={() => setIsDialogOpen(false)} className="w-full">
                  닫기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* 5. Dropdown Menu 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">메뉴 열기</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                설정
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                메시지
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* 6. Tooltip 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Tooltip</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  즐겨찾기
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                이 항목을 즐겨찾기에 추가합니다
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </section>

        {/* 7. Form 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Form 검증 (react-hook-form + zod)</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            {/* 이름 필드 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                이름
              </label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* 이메일 필드 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* 메시지 필드 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                메시지
              </label>
              <Input
                id="message"
                placeholder="메시지를 입력하세요"
                {...register('message')}
                className={errors.message ? 'border-red-500' : ''}
              />
              {errors.message && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message.message}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              제출
            </Button>
          </form>
        </section>

        {/* 8. 테이블 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">테이블 컴포넌트</h2>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'Active' ? 'default' : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* 9. Lucide Icons 섹션 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Lucide React 아이콘</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xs text-muted-foreground">Heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Settings className="h-8 w-8 text-blue-500" />
              <span className="text-xs text-muted-foreground">Settings</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="h-8 w-8 text-green-500" />
              <span className="text-xs text-muted-foreground">Mail</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <span className="text-xs text-muted-foreground">Alert</span>
            </div>
          </div>
        </section>

        {/* 10. 반응형 디자인 */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">반응형 디자인</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2">카드 {item}</h3>
                <p className="text-sm text-muted-foreground">
                  이 카드는 반응형 레이아웃을 사용합니다. 화면 크기에 따라 자동으로 조정됩니다.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Next.js 16 Starter Kit © 2025. 모든 권리 예약.
          </p>
        </div>
      </footer>
    </div>
  );
}
