"use server";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import convert from "xml-js";
import { recordsToCsv } from "@/lib/utils.server";

const ObjectToCSV = require("object-to-csv");

const exportSchema = z.object({
   notes: z.array(z.object({
      id: z.string(),
      title: z.string().nullable(),
      metadata: z.any(),
      raw_text: z.string(),
      tags: z.array(z.string()),
      authorId: z.string(),
      public: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string().nullable(),
   })),
   single: z.boolean().nullable(),
   format: z.union([
      `CSV`,
      `JSON`,
      `Markdown`,
      `HTML`,
      `XML`,
   ].map(value => z.literal(value))),
});

/**
 * An API route for exporting a note in a specific format.
 */
export async function POST(req: NextRequest) {
   const body = exportSchema.safeParse(await req.json());
   if (!body.success) return NextResponse.json({
      errors: body.error.errors.map(({ message, path }) => ({
         path,
         message,
      })),
   }, { status: 500 });

   const { format, notes, single = false } = body.data;

   if (format === `CSV`) {
      const csv = await recordsToCsv(notes, `,`)
      console.log({ csv, notes });

      const fileName = single ? `note-${notes[0].id}.csv` : `notes.csv`;

      return new NextResponse(csv, {
         status: 200, headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename=${encodeURIComponent(fileName)}`,
         },
      });
   }

   if (format === `JSON`) {
      const data = JSON.stringify(notes, null, 2);
      const fileName = single ? `note-${notes[0].id}.json` : `notes.json`;

      return new NextResponse(data, {
         status: 200, headers: {
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename=${encodeURIComponent(fileName)}`,
         },
      });

   }

   if (format === `XML`) {
      console.log({ notes });
      const xmlData = convert.js2xml(notes, {
         spaces: 3,
         compact: true,
         parentKey: `note`,
      });

      const fileName = single ? `note-${notes[0].id}.xml` : `notes.xml`;
      console.log({ xmlData });

      return new NextResponse(xmlData, {
         status: 200, headers: {
            "Content-Type": "text/xml",
            "Content-Disposition": `attachment; filename=${encodeURIComponent(fileName)}`,
         },
      });

   }
}