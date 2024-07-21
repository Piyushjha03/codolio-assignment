import * as React from "react";

import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleX, Delete } from "lucide-react";

export function Filter(props) {
  const data = props.data;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const clearFilter = () => {
    props.setSelectedStatus(null);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-between">
            {props.selectedStatus ? (
              <>
                {props.selectedStatus.name}
                <CircleX onClick={clearFilter} className="hover:text-red-400" />
              </>
            ) : (
              <>+ Set {props.filterType}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={props.setSelectedStatus}
            data={data}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-between">
          {props.selectedStatus ? (
            <>
              {props.selectedStatus.name}
              <CircleX onClick={clearFilter} className="hover:text-red-400" />
            </>
          ) : (
            <>+ Set {props.filterType}</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={props.setSelectedStatus}
            data={data}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({ setOpen, setSelectedStatus, data }) {
  return (
    <Command>
      <CommandInput placeholder="Filter ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data.map((status) => (
            <CommandItem
              key={status.name}
              name={status.name}
              onSelect={(name) => {
                setSelectedStatus(
                  data.find((priority) => priority.name === name) || null
                );
                setOpen(false);
              }}
            >
              {status.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
