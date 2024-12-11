import {Payment, columns} from "./columns";
import {DataTable} from "./data-table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  //"backlog" | "todo" | "in progress" | "done" | "canceled"
  //"low" | "medium" | "high"
  return [
    {
      id: "f3b49d35-0d24-4953-8cae-a224156710e6",
      title: "We need to bypass the neural TCP card!",
      status: "backlog",
      priority: "low",
    },
    {
      id: "7e94ab86-833b-468b-b2d1-85b0f2f6515f",
      title: "You can't compress the program without quantifying the open-source SSD pixel",
      status: "todo",
      priority: "medium",
    },
    {
      id: "3a058804-232a-4e11-a883-26137e4851f0",
      title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "in progress",
      priority: "high",
    },
    {
      id: "6239c225-1461-49d3-8b5c-e775828f0802",
      title:
        "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth",
      status: "done",
      priority: "low",
    },
    {
      id: "f1b73c95-40f2-4d56-86d9-1601a8f8dfd9",
      title:
        "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
      status: "canceled",
      priority: "high",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Personal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tasks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </SidebarInset>
  );
}
