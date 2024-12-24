import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormValues } from "./types";

interface AddOnsProps {
  form: UseFormReturn<FormValues>;
}

export function AddOns({ form }: AddOnsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Add-Ons</h3>
      
      <FormField
        control={form.control}
        name="wantCoverImage"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Cover Image (+$5)
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                A unique, professional design that complements your song
              </p>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="wantSecondSong"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Second Song Option (+$15)
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                Get both custom song variations instead of choosing just one
              </p>
            </div>
          </FormItem>
        )}
      />

      {form.watch().wantSecondSong && (
        <FormField
          control={form.control}
          name="wantSecondCoverImage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ml-6">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Cover Image for Second Song (+$5)
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Add a unique cover for your second song variation
                </p>
              </div>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}