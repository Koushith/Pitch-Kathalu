// upload script

import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const uploadScript = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("This route works");
  }
);

// get one script

// update script

// delete
